import Axios from 'axios'
import errorHandler from '@/helpers/errorHandler'

const state = {
  loading: false,
  timetables: [],
  lastFetch: null,
  selectedTimetable: null,
  selectedTerm: null,

  timetableExpandableIndex: null,
}

const mutations = {
  setLoading(state, status) {
    state.loading = status
  },

  setTimetables(state, timetables) {
    state.timetables = timetables
  },

  setSelectedTimetable(state, timetable) {
    state.selectedTimetable = timetable
  },

  setSelectedTerm(state, index) {
    state.selectedTerm = index
  },

  setLastFetch(state, lastFetch) {
    state.lastFetch = lastFetch
  },

  setTimetableExpandableIndex(state, index) {
    state.timetableExpandableIndex = index
  },
}

const actions = {
  async fetch(context) {
    context.commit('setLoading', true)
    try {
      let res = await Axios.get('/horarios')

      let timetables = []
      for(let i = 0; i < res.data.length; i++){
        let intentResult = res.data[i]
        if(!intentResult.result) continue

        if(intentResult.provider){
          intentResult.result.map((timetable) => {
            timetable.provider = intentResult.provider
          })
        }
        timetables.push(...intentResult.result)
      }
      context.commit('setTimetables', timetables)
      context.commit('setLastFetch', new Date())
      context.commit('setLoading', false)
    } catch(err) {
      errorHandler(err, context.dispatch, 'fetch')
      context.commit('setLoading', false)
    }
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}