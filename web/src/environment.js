// TODO: Do not check URL in order to know the environment
const URL = window.location.hostname;
function isLocal() {
  if (URL == "localhost") return true;
  if (URL.includes("192.168")) return true;
  return false;
}

function isStaging() {
  if (URL.includes("layers-horarios-staging")) return true;
  return false;
}

function ApiLocation() {
  // Handle local development
  if (isLocal()) {
    return "http://localhost:8060/layers-visao-de-horarios/us-central1/api/api/";
  }

  if (isStaging()) {
    return "/api";
  }

  // Defaults to production api
  return "/api";
}

export default {
  API_URL: ApiLocation(),
};
