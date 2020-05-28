// TODO: Do not check URL in order to know the environment
const URL = window.location.hostname
function isLocal() {
  if (URL == 'localhost') return true
  if (URL.includes('192.168')) return true
  return false
}

function isStaging() {
  if (URL == 'id.staging.layers.digital') return true
  return false
}

function ApiLocation() {
  // Handle local development
  if (isLocal()) {
    return 'http://localhost:8050/layers-visao-de-horarios/us-central1/api'
  }

  if (isStaging()) {
    return 'https://us-central1-layers-visao-de-horarios.cloudfunctions.net/api'
  }

  // Defaults to production api
  return 'https://us-central1-layers-visao-de-horarios.cloudfunctions.net/api'
}

export default {
  API_URL: ApiLocation()
}