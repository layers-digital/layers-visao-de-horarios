import Vue from "vue";
import Vuex from "vuex";

import timetables from "./timetables";
import layers from "./layers";

import persistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default function createStore({ communityId, userId }) {
  const options = {
    strict: true,
    plugins: [],
    modules: {
      layers,
      timetables,
    },
  };

  // Enable persisted state if user's LocalStore is enabled
  if (isLocalStorageEnabled()) {
    options.plugins.push(
      persistedState({
        key: `@${communityId}:${userId}-layers-visao-de-horarios`,
      })
    );
  }
  return new Vuex.Store(options);
}

function isLocalStorageEnabled() {
  try {
    return window.localStorage instanceof Storage;
  } catch (error) {
    return false;
  }
}
