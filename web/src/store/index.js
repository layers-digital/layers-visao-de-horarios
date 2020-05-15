import Vue from 'vue'
import Vuex from 'vuex'
import timetables from './timetables'

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    timetables,
  },
})