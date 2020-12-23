const Sentry = require('@sentry/node')
const express = require('express')
const cors = require('cors')
const _ = require('lodash')


const { BadRequest, AxiosError, InternalError } = require('../errors')
const LayersAPI = require('../LayersAPI')

const app = express()

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

    const Layers = new LayersAPI(community)

    // Fetch user data
    let userData = null
    if(session) {
      try {
        await Layers.validateSession(community, session, userId)

        userData = await Layers.fetchUserData(userId)

      } catch(err) {
        if(!err.response) throw new InternalError(err.message)
        throw new AxiosError(err)
      }
    } else {
      // Deprecated method to validate user token
      try {
        userData = await Layers.fetchUserData(userToken)
      } catch(err) {
        if(!err.response) throw new InternalError(err.message)
        throw new AxiosError(err)
      }
    }

    // Discovery providers
    let providers = []
    try {
      providers = await Layers.discoverProviders()
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
          payload: await Layers.callProviders(data, provider.id)
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

module.exports = app