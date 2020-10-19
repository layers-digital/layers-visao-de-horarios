import Vue from "vue";
import Vuex from "vuex";

import timetables from "./timetables";
import layers from "./layers";

import persistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default function createStore({ communityId, userId }) {
  let options;
  try {
    options = {
      strict: true,
      plugins: [
        persistedState({
          key: `@${communityId}:${userId}-layers-visao-de-horarios`,
        }),
      ],
      modules: {
        layers,
        timetables,
      },
    };
  } catch (err) {
    options = {
      strict: true,
      modules: {
        layers,
        timetables,
      },
    };
  }

  return new Vuex.Store(options);
}
