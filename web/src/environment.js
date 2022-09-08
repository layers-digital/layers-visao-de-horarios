// TODO: Do not check URL in order to know the environment
const URL = window.location.hostname;
function isLocal() {
  if (URL == 'localhost') return true;
  if (URL.includes('192.168')) return true;
  return false;
}

function isStaging() {
  if (URL.includes('layers-horarios-staging')) return true;
  return false;
}

function LayersApiLocation() {
  // Handle local development
  if (isLocal()) {
    if (URL == 'localhost') return 'http://localhost:8009/v1';
    if (URL.includes('192.168')) return URL.replace(/:\d+.*/, ':8009/v1');
  }

  if (isStaging()) {
    return 'https://api.staging.layers.digital/v1';
  }

  // Defaults to production api
  return 'https://api.layers.digital/v1';
}

function ApiLocation() {
  // Handle local development
  if (isLocal()) {
    return 'http://localhost:8060/layers-visao-de-horarios/us-central1/api/api/';
  }

  if (isStaging()) {
    return '/api';
  }

  // Defaults to production api
  return '/api';
}

function getGAEnvs() {
  if (isLocal() || isStaging()) {
    // CRIAR PROJETO NO FIREBASE E PEGAR ENVS
    return {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    };
  }
  // PEGAR ENVS
  return {
    apiKey: 'AIzaSyClHapIUfABfG7HlGLX7MldyTJMHqlO36w',
    authDomain: 'layers-visao-de-horarios.firebaseapp.com',
    databaseURL: 'https://layers-visao-de-horarios.firebaseio.com',
    projectId: 'layers-visao-de-horarios',
    storageBucket: 'layers-visao-de-horarios.appspot.com',
    messagingSenderId: '357333412353',
    appId: '1:357333412353:web:1e37658fa7c596e5a36e00',
    measurementId: 'G-230LP96Q3H',
  };
}

function getAmplitudeEnvs() {
  //DEFINIR ORGANIZACAO DO AMPLITUDE E PEGAR ENVS
  if (isLocal() || isStaging()) {
    return {
      apiKey: '',
    };
  }

  return {
    apiKey: '',
  };
}

export default {
  API_URL: ApiLocation(),
  LAYERS_API_URL: LayersApiLocation(),

  // Google Analytics
  GA_CONFIG: getGAEnvs(),

  // Amplitude Analytics
  AMPLITUDE_CONFIG: getAmplitudeEnvs(),
};
