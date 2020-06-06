import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import store from './store'
import General from './styles/General.css'
import Grid from './styles/Grid.css'
import Colors from './styles/Colors.css'
import Transitions from './styles/Transitions.css'
import Text from './styles/Text.css'
import Utils from './styles/Utils.css'
import Environment from './environment'
import * as firebase from "firebase/app"
import "firebase/analytics"
import "firebase/performance"

const firebaseConfig = {
  apiKey: "AIzaSyClHapIUfABfG7HlGLX7MldyTJMHqlO36w",
  authDomain: "layers-visao-de-horarios.firebaseapp.com",
  databaseURL: "https://layers-visao-de-horarios.firebaseio.com",
  projectId: "layers-visao-de-horarios",
  storageBucket: "layers-visao-de-horarios.appspot.com",
  messagingSenderId: "357333412353",
  appId: "1:357333412353:web:1e37658fa7c596e5a36e00",
  measurementId: "G-230LP96Q3H"
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()
firebase.performance()

Vue.prototype.$analytics = firebase.analytics()

Vue.config.productionTip = false

Axios.defaults.baseURL = Environment.API_URL

new Vue({
  router,
  store,
  General,
  Grid,
  Colors,
  Transitions,
  Text,
  Utils,
  Axios,
  render: function (h) { return h(App) }
}).$mount('#app')
