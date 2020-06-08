<template>
  <div class="app-bar-container">
    <div class="app-bar grey-30-outline">
      <div 
        @click="expand()" 
        class="ls-row ls-no-gutters p-3 ls-align-items-center ls-flex-nowrap cursor-pointer" style="height: 56px; z-index: 5;"
      >
        <div @click="goToOverview()" class="ls-align-items-center ls-flex-grow-1 ls-d-flex" style="height: 100%;">
          <span class="ls-text-center title ellipsis-1">
            {{ (!expanded && currentPage.id != 'overview') ? selectedTimetable && selectedTimetable.student : 'Resumo do dia' }}
          </span>
        </div>
        <div class="ls-align-items-center ls-flex-grow-0 ml-5 ls-d-flex" style="height: 100%;">
          <img src="@/assets/menu.svg" height="24" width="24" />
        </div>
      </div>
      <div class="ls-d-flex weekdays" v-if="isShowWeekdays">
        <WeekdayButton 
          v-for="weekday in weekdays"
          :key="weekday"
          :label="weekdayLabel(weekday)"
          :selected="weekday == selectedWeekday"
          @click.native="$store.commit('timetables/setSelectedWeekday', weekday)"
        />
      </div>
      <TransitionExpand>
        <div v-if="expanded">
          <router-link
            tag="a"
            v-for="link in links"
            :key="link.id"
            @click.native="setCurrentPage(link)"
            :class="{'link--text': link.id == currentPage.id, 'lead--text': link.id != currentPage.id}"
            style="text-decoration: none;"
            :to="link.route"
          >
            <div class="ls-row ls-no-gutters p-3 ls-align-items-center ls-flex-nowrap">
              <span class="align-center title ellipsis-1 ls-flex-grow-1">{{link.title}}</span>
              <Chip class="ls-flex-nowrap" :label="link.season" v-if="link.season" />
            </div>
          </router-link>
        </div>
      </TransitionExpand>
    </div>
    <transition name="fade">
      <div v-if="expanded" @click="expanded = !expanded" class="overlay"></div>
    </transition>
  </div>
</template>

<script>
import getCurrentWeekday from '@/helpers/getCurrentWeekday'
import TransitionExpand from '@/components/TransitionExpand'
import WeekdayButton from '@/components/WeekdayButton'
import Chip from '@/components/Chip'
import { mapState } from 'vuex'
import _ from 'lodash'

const OVERVIEW_PAGE = {
  id: 'overview',
  title: 'Visão geral',
  route: {
    name: 'overview',
  }
}

export default {
  name: 'AppBar',
  
  components: {
    TransitionExpand,
    Chip,
    WeekdayButton,
  },

  data() {
    return {
      expanded: false,
      currentPage: OVERVIEW_PAGE,
    }
  },

  created() {
    this.updateCurrentPage(this.$route)
  },

  watch: {
    $route(to) {
      this.updateCurrentPage(to)
    }
  },

  computed: {
    ...mapState('timetables', ['timetables', 'loading', 'weekdays', 'selectedTimetable', 'selectedWeekday']),

    links() {
      let links = this.timetables.map((timetable) => {
        let link = {
          id: null,
          title: null,
          route: {
            name: null,
            params: {
              timetable: null,
            }
          },
          season: null
        }

        link.id = link.route.params.id = timetable.id || (timetable.student + timetable.season)
        link.title = timetable.student
        link.season = timetable.season
        link.route.name = 'timetables.detail'
        link.route.params.timetable = timetable

        return link
      })

      return links
    },

    isShowWeekdays() {
      return !this.expanded && this.currentPage.id != 'overview' && _.get(this.weekdays, 'length', 0)
    }
  },

  methods: {
    updateCurrentPage(route) {
      if(route.name == 'overview') {
        this.currentPage = OVERVIEW_PAGE
        this.$store.commit('timetables/setSelectedTimetable', null)
        this.$store.commit('timetables/setSelectedWeekday', null)
        return
      }

      if(route.name == 'timetables.detail') {
        let targetLink = this.links.find(link => link.id == route.params.id) || null
        if(!this.links || !this.links.length || !targetLink) {
          this.currentPage = OVERVIEW_PAGE
          this.$router.push({ name: 'overview' })
          return
        }
        this.currentPage = route

        let timetable = _.get(targetLink, 'route.params.timetable', null) || _.get(route, 'params.timetable', null)
        this.$store.commit('timetables/setSelectedTimetable', timetable)

        let weekday = getCurrentWeekday(this.weekdays)
        this.$store.commit('timetables/setSelectedWeekday', weekday)
      }
    },

    setCurrentPage(page) {
      this.currentPage = page
      this.expand()
    },

    expand() {
      this.expanded = !this.expanded
    },

    goToOverview() {
      if(this.expanded && _.get(this.currentPage, 'route.name', '') != 'overview') {
        this.$router.push({ name: 'overview' })
      }
    },

    weekdayLabel(weekday) {
      return {
        'sunday': 'Dom',
        'monday': 'Seg',
        'tuesday': 'Ter',
        'wednesday': 'Qua',
        'thursday': 'Qui',
        'friday': 'Sex',
        'saturday': 'Sáb',
      }[weekday] || '-'
    }
  }
}
</script>

<style scoped>
.app-bar-container {
  position: relative;
  border-radius: 0px 0px 12px 12px;
}
.app-bar {
  position: relative;
  background-color: white;
  border-bottom: 1px solid;
  border-radius: 0px 0px 12px 12px;
  z-index: 1234;
}
.bar-title {
  font-size: 16px;
  font-weight: 600;
  text-decoration: none !important;
  color: #232B34;
}
.overlay {
  position: fixed;
  top: 0;
  z-index: 2;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.group-chevron {
  transition: transform 0.2s, opacity 0.2s;
}
.group-chevron.active {
  transform: rotateZ(180deg);
}
.title {
  font-size: 16px;
  font-weight: 600;
  text-decoration: none !important;
}
.weekdays {
  padding-left: 16px; 
  height: 48px; 
  overflow: auto;
}
.weekdays::after {
  content: "";
  padding-right: 16px;
}
.weekdays > .ls-weekday-button {
  margin-right: 8px;
}
.weekdays > .ls-weekday-button:last-child {
  margin-right: 0px;
}

</style>