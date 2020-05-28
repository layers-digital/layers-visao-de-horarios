import Axios from 'axios'
import errorHandler from '@/helpers/errorHandler'
import formatDate from '@/helpers/formatDate'
import _ from 'lodash'

const ALL_WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const state = {
  community: null,
  token: null,

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

    let weekdays = [...ALL_WEEKDAYS]
    // Remove Sunday from weekdays if doesn't exist any schedules on Sunday
    if(!_.find(timetable.schedules, { weekday: 'sunday' })) {
      weekdays = weekdays.filter(d => d != 'sunday')
    }
    // Remove Saturday from weekdays if doesn't exist any schedules on Saturday
    if(!_.find(timetable.schedules, { weekday: 'saturday' })) {
      weekdays = weekdays.filter(d => d != 'saturday')
    }

    // Sort by startWeekday
    if(timetable.startWeekday && _.includes(weekdays, timetable.startWeekday)) {
      const startWeekdayIndex = weekdays.indexOf(timetable.startWeekday)
      const beforeDays = weekdays.splice(0, startWeekdayIndex)
      weekdays = [...weekdays, ...beforeDays]
    }
    state.weekdays = weekdays
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

  setCommunity(state, community) {
    state.community = community
  },

  setToken(state, token) {
    state.token = token
  },
}

const actions = {
  async fetch(context, state) {
    let community = context.state.community
    let token = context.state.token
    
    context.commit('setLoading', true)
    try {
      let res = await Axios.get('/related?community=' + community + '&token=' + token)

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

      if(!timetables.length && res.data.result){
        timetables = res.data.result
      }
      context.commit('setTimetables', timetables)
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