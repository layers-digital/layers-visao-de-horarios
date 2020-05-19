import Axios from 'axios'
import errorHandler from '@/helpers/errorHandler'
import _ from 'lodash'

const state = {
  loading: false,
  timetables: [],
  weekdays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],

  lastFetch: null,
  selectedTimetable: null,
  selectedWeekday: null,

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

    if(!timetable || !timetable.schedules || !timetable.schedules.length) {
      state.weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      return
    }
    const weekdays = _(timetable.schedules).groupBy('weekday').keys().value()
    let defaultWeekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

    console.log(weekdays)
    // 
    if(weekdays.find('sunday')) {

    }
    state.weekdays = ''
  },

  setSelectedWeekday(state, index) {
    state.selectedWeekday = index
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