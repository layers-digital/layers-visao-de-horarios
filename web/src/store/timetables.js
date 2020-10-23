import Axios from "axios";
import errorHandler from "@/helpers/errorHandler";
import formatDate from "@/helpers/formatDate";
import _ from "lodash";
import getQueryVariable from "@/helpers/getQueryVariable";

const ALL_WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const state = {
  bodyBackgroundColor: "grey-10",
  community: null,
  token: null,

  loading: false,
  timetables: [],
  weekdays: ALL_WEEKDAYS,

  lastFetch: null,
  selectedTimetable: null,
  selectedWeekday: null,

  timetableExpandableIndex: null,
};

const mutations = {
  setBodyBackgroundColor(state, color) {
    state.bodyBackgroundColor = color;
  },

  setLoading(state, status) {
    state.loading = status;
  },

  setTimetables(state, timetables) {
    state.timetables = timetables;
  },

  setSelectedTimetable(state, timetable) {
    state.selectedTimetable = timetable;

    if (!timetable || !timetable.schedules || !timetable.schedules.length) {
      state.weekdays = ALL_WEEKDAYS;
      return;
    }

    let weekdays = [...ALL_WEEKDAYS];
    // Remove Sunday from weekdays if doesn't exist any schedules on Sunday
    if (!_.find(timetable.schedules, { weekday: "sunday" })) {
      weekdays = weekdays.filter((d) => d != "sunday");
    }
    // Remove Saturday from weekdays if doesn't exist any schedules on Saturday
    if (!_.find(timetable.schedules, { weekday: "saturday" })) {
      weekdays = weekdays.filter((d) => d != "saturday");
    }

    // Sort by startWeekday
    if (
      timetable.startWeekday &&
      _.includes(weekdays, timetable.startWeekday)
    ) {
      const startWeekdayIndex = weekdays.indexOf(timetable.startWeekday);
      const beforeDays = weekdays.splice(0, startWeekdayIndex);
      weekdays = [...weekdays, ...beforeDays];
    }
    state.weekdays = weekdays;
  },

  setSelectedWeekday(state, index) {
    state.selectedWeekday = index;
  },

  setLastFetch(state, lastFetch) {
    state.lastFetch = lastFetch;
  },

  setTimetableExpandableIndex(state, index) {
    state.timetableExpandableIndex = index;
  },

  setCommunity(state, community) {
    state.community = community;
  },

  setToken(state, token) {
    state.token = token;
  },
};

const actions = {
  async fetch(context) {
    const community = getQueryVariable("community");
    const token = getQueryVariable("token");
    if (community) context.commit("setCommunity", community);
    if (token) context.commit("setToken", token);

    // Show loading toast
    context.commit("setLoading", true);

    const session = LayersPortal.session;
    const userId = LayersPortal.userId;
    const communityId = LayersPortal.communityId;

    try {
      const res = await Axios.get("/related", {
        params: {
          userToken: context.state.token,
          community: communityId,
          session: session,
          userId: userId,
        },
      });

      let timetables = [];
      for (let i = 0; i < res.data.length; i++) {
        let intentResult = res.data[i];
        if (!intentResult.result) continue;

        if (intentResult.provider) {
          intentResult.result.map((timetable) => {
            timetable.provider = intentResult.provider;
          });
        }
        timetables.push(...intentResult.result);
      }

      if (!timetables.length && res.data.result) {
        timetables = res.data.result;
      }
      context.commit("setTimetables", timetables);
      context.commit("setLastFetch", new Date());
      context.commit("setLoading", false);
    } catch (err) {
      errorHandler({
        error: err,
        parameters: {
          action: {
            callback: () => {
              context.dispatch("fetch");
            },
            label: "ATUALIZAR",
          },
          timeout: 0,
        },
      });
      context.commit("setLoading", false);
    }
  },
};

const getters = {
  currentWeekdayLabel: (state) => {
    const date = new Date();
    let weekday;
    const weekdays = {
      sunday: "Domingo",
      monday: "Segunda-feira",
      tuesday: "Terça-feira",
      wednesday: "Quarta-feira",
      thursday: "Quinta-feira",
      friday: "Sexta-feira",
      saturday: "Sábado",
    };
    if (!state.selectedWeekday) {
      weekday = weekdays[Object.keys(weekdays)[date.getDay()]];
    } else if (state.selectedWeekday) {
      weekday = weekdays[state.selectedWeekday];
    }

    return weekday;
  },

  currentSelectedDayLabel: (state) => {
    if (!state.selectedWeekday) {
      return "";
    }

    const dayOfWeek = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    }[state.selectedWeekday];

    const date = new Date();
    const currentDay = date.getDay();
    const distance = dayOfWeek - currentDay;
    date.setDate(date.getDate() + distance);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return formatDate(date);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
