const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const Sentry = require('@sentry/node');
const { BadRequest, AxiosError, InternalError } = require('./errors');

const INTENT = '@layers:education:Timetables:getRelated'

const app = express()

Sentry.init({
  dsn: functions.config().sentry.dsn,
  environment: functions.config().sentry.env,
  attachStacktrace: true,
})
app.use(Sentry.Handlers.requestHandler())

app.use(cors())

app.get('/', async function (req, res, next) {
  try {
    // Disable CORS when is running locally
    if(process.env.FUNCTIONS_EMULATOR) {
      res.set({ 'Access-Control-Allow-Origin': '*' })
    }

    const { userToken, community, session, userId } = req.query

    if(!userToken && !session) {
      throw new BadRequest('user token or session not provided')
    }

    if(!userToken && session && !userId) {
      throw new BadRequest('userId not provided')
    }

    if(!community) {
      throw new BadRequest('community of user not provided')
    }

    const Layers = axios.create({
      baseURL: functions.config().layers.api,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'community-id': community
      }
    })

    // Fetch user data
    let userData = null
    if(session) {
      try {
        await Layers.get('/sso/session/validate', {
          params: { community, session, userId },
          headers: { 'Authorization': 'Bearer ' + functions.config().layers.secret }
        })
      } catch(err) {
        if(!err.response) throw new InternalError(err.message)
        throw new AxiosError(err)
      }

      try {
        let res = await Layers.get(`/users/${userId}`, {
          headers: { 'Authorization': 'Bearer ' + functions.config().layers.secret }
        })
        userData = res.data
      } catch(err) {
        if(!err.response) throw new InternalError(err.message)
        throw new AxiosError(err)
      }
    } else {
      // Deprecated method to validate user token
      try {
        let res = await Layers.get('/user/me/', {
          headers: { 'Authorization': `Bearer ${userToken}`}
        })
        userData = res.data
      } catch(err) {
        if(!err.response) throw new InternalError(err.message)
        throw new AxiosError(err)
      }
    }

    // Discovery providers
    let providers = []
    try {
      let res = await Layers.get(`/services/discover/${INTENT}?version=1`,
      {
        headers: { 'Authorization': 'Bearer ' + functions.config().layers.secret }
      })
      providers = res.data
    } catch(err) {
      if(!err.response) throw new InternalError(err.message)
      throw new AxiosError(err)
    }

    // Call intents
    const promises = providers.map(async provider => {
      const data = {
        user: {
          id: userData._id,
          name: userData.name,
          alias: userData.alias,
          // timezone: String,  // Fuso horário do usuário
          // language: String,  // Língua preferencial do usuário
          // accountId: String,  // ID da account do usuário
        },
      }
      try {
        return {
          status: 'success',
          provider: provider,
          payload: await Layers.post(`/services/call/${INTENT}/${provider.id}?version=1&timeout=10000`, data,
          {
            headers: { 'Authorization': 'Bearer ' + functions.config().layers.secret }
          })
        }
      } catch(err) {
        return {
          status: 'error',
          provider: provider,
          payload: err
        }
      }
    })
    let providersData = await Promise.all(promises)
    let payload = []

    providersData.forEach(data => {
      let providerPayload = {
        provider: data.provider,
        result: _.get(data, 'payload.data.data.result', []),
      }
      payload.push(providerPayload)
    })

    return res.status(200).send(payload)
  } catch (error) {
    return next(error)
  }
})

app.use(Sentry.Handlers.errorHandler())

// Expose Express API as a single Cloud Function:
exports.related = functions.https.onRequest(relatedAPI);