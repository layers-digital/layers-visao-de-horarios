<template>
  <div class="app-bar-container">
    <div class="app-bar grey-30-outline">
      <div 
        @click="expand()" 
        class="ls-row ls-no-gutters p-3 ls-align-items-center ls-flex-nowrap" style="height: 56px; z-index: 5;"
      >
        <div @click="goToOverview()" class="ls-align-items-center mr-3 ls-flex-grow-0 ls-d-flex" style="max-width: 24px; height: 100%;">
          <Loader v-if="loading" />
          <img 
            v-else-if="!loading && !expanded && currentPage.id != 'overview'" 
            src="@/assets/user.svg" 
            height="24" 
            width="24" 
            class="app-icon-radius" 
          />
          <img 
            v-else
            src="@/assets/bell.svg" 
            height="24" 
            width="24" 
            class="app-icon-radius" 
          />
        </div>
        <div @click="goToOverview()" class="ls-align-items-center ls-flex-grow-1 ls-d-flex" style="height: 100%;">
          <span class="ls-text-center title ellipsis-1">
            {{ (!expanded && currentPage.id != 'overview') ? selectedTimetable && selectedTimetable.student : 'Resumo do dia' }}
          </span>
        </div>
        <div class="ls-align-items-center ls-flex-grow-0 ml-5 ls-d-flex" style="height: 100%;">
          <img src="@/assets/arrow-down.svg"
            class="group-chevron"
            :class="{ 'active': expanded }"
            height="24" 
            width="24"
          />
        </div>
      </div>
      <div class="ls-d-flex terms" v-if="isShowTermOptions">
<!--         <TermButton 
          v-for="(term, i) in selectedTimetable.terms"
          :icon="i === selectedTerm ? 'location' : ''"
          :key="term.label"
          :label="term.label"
          :selected="i == selectedTerm"
          class="mr-2"
          :id="'term-'+i"
          @click.native="$store.commit('timetables/setSelectedTerm', i); $store.commit('timetables/setSubjectExpandableIndex', null)"
        /> -->
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
              <div class="ls-col ls-align-self-center mr-3 ls-flex-grow-0" style="max-width: 24px;">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path :fill="link.id == currentPage.id ? '#2F8AF5': '#434E5B'" d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"/></svg>
              </div>
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
import TransitionExpand from './TransitionExpand'
import Chip from './Chip'
import TermButton from './TermButton'
import Loader from './Loader'
import { mapState } from 'vuex'
import _ from 'lodash'
import getCurrentWeekdayIndex from '@/helpers/getCurrentWeekdayIndex'

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
    Loader,
    // TermButton,
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
    ...mapState('timetables', ['timetables', 'loading', 'selectedTimetable', 'selectedTerm']),

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

    isShowTermOptions() {
      return !this.expanded && this.currentPage.id != 'overview' && (_.get(this.selectedTimetable, 'terms.length', 0) || _.get(this.selectedTimetable, 'attachments.length', 0))
    }
  },

  methods: {
    updateCurrentPage(route) {
      if(route.name == 'overview') {
        this.currentPage = OVERVIEW_PAGE
        this.$store.commit('timetables/setSelectedTimetable', null)
        this.$store.commit('timetables/setSelectedTerm', null)
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

        let termIndex = getCurrentWeekdayIndex()

        setTimeout(() => {
          let term = document.getElementById("term-" + termIndex)
          if (term) term.scrollIntoView()
        }, 500)
        this.$store.commit('timetables/setSelectedTerm', termIndex)
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
.terms {
  padding-left: 16px; 
  height: 48px; 
  overflow: auto;
}
.terms::after {
  content: "";
  padding-right: 16px;
}
</style>