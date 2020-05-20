import Axios from 'axios'
import errorHandler from '@/helpers/errorHandler'
import formatDate from '@/helpers/formatDate'
import _ from 'lodash'

const ALL_WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const state = {
  loading: false,
  timetables: [],
  weekdays: ALL_WEEKDAYS,

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
      state.weekdays = ALL_WEEKDAYS
      return
    }

    // TODO
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
  currentWeekdayLabel: state => {
    const date = new Date();
    let weekday
    const weekdays = {
      'sunday': 'Domingo',
      'monday': 'Segunda-feira',
      'tuesday': 'Terça-feira',
      'wednesday': 'Quarta-feira',
      'thursday': 'Quinta-feira',
      'friday': 'Sexta-feira',
      'saturday': 'Sábado',
    }
    if(!state.selectedWeekday) {
      weekday = weekdays[Object.keys(weekdays)[date.getDay()]]
    } else if (state.selectedWeekday) {
      weekday = weekdays[state.selectedWeekday]
    }

    return weekday;
  },

  currentSelectedDayLabel: state => {
    if(!state.selectedWeekday) {
      return ''
    }

    const dayOfWeek = {
      'sunday': 0,
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6
    }[state.selectedWeekday]
  
    const date = new Date()
    const currentDay = date.getDay()
    const distance = dayOfWeek - currentDay
    date.setDate(date.getDate() + distance);
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return formatDate(date);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}