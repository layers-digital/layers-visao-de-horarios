import Vue from 'vue'
import Vuex from 'vuex'
import getQueryVariable from '@/helpers/getQueryVariable'

import timetables from './timetables'
import layers from './layers'

import persistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const community = getQueryVariable('community')

export default new Vuex.Store({
  strict: true,
  plugins: [
    persistedState({
      key: community
    })
  ],
  modules: {
    layers,
    timetables
  },
})