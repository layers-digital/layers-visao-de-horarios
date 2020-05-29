const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const _ = require('lodash');

const app = express();

const INTENT = '@layers:education:Timetables:getRelated'

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

app.get('/related', async function (req, res) {
  const { token, community } = req.query

  const apiLayers = functions.config().layers.api
  const secret = functions.config().layers.secret

  if(!secret) {
    return res.status(500).send({error: `Layers Secret not setted`})
  }

  if(!apiLayers) {
    return res.status(500).send({error: `Layers API not setted`})
  }

  if(!token) {
    return res.status(400).send({error: `user token not provided`})
  }

  if(!community) {
    return res.status(400).send({error: `community of user not provided`})
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
  try {
    let res = await Layers.get('/user/me/', {
      headers: { 'Authorization': `Bearer ${token}`}
    })
    userData = res.data
  } catch(err) {
    return res.status(500).send({ error: `Erro ao buscar dados do usuário no Layers` })
  }

  // Discovery providers
  let providers = []
  try {
    let res = await Layers.get(`/services/discover/${INTENT}?version=1`,
    {
      headers: { 'Authorization': `Bearer ${secret}` }
    })
    providers = res.data
  } catch(err) {
    return res.status(500).send({error: `Erro ao buscar dados dos providers no Layers` })
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
        payload: await Layers.post(`/services/call/${INTENT}/${provider.id}?version=1`, data,
        {
          headers: { 'Authorization': `Bearer ${secret}` }
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
})

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);