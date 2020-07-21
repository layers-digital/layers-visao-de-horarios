<template>
  <div class="page ls-container p-3 ls-d-flex ls-flex-column ls-align-items-center"
  :class="(!timetables || !timetables.length) && !loading ? 'ls-justify-content-center' : ''">
    <template v-if="timetables && timetables.length">
      <div class="lead-light--text mb-3 today"> 
        Hoje, <b class="aqua--text">{{ currentWeekdayLabel }}</b>
      </div>
      <OverviewTimetableCard
        v-for="(timetable, i) in timetables"
        :key="timetable.id || i"
        :timetable="timetable"
        class="mb-2"
        @openTimetable="openTimetable(timetable)"
        :expanded="timetableExpandableIndex == i || includes(timetableExpandableIndex, i)"
        @expand="expand(i, $event)"
      />
    </template>
    <template v-else-if="!loading">
      <span class="no-timetables-title bold mb-2 lead--text text-center">
        Não há informações disponíveis :(
      </span>
      <span class="lead-light--text text-center">
        Entre em contato com sua instituição de <br />
        ensino ou atualize a página
      </span>
      <div class="no-timetables-image pt-4 mt-5">
        <img src="@/assets/empty-timetables.svg" width="268" height="208" />
      </div>
    </template>
    <template v-else>
      <Skeleton v-for="index in 6" :key="index" class="mb-3" style="opacity: 0.7;" />
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Skeleton from '@/components/Skeleton'
import OverviewTimetableCard from '@/components/OverviewTimetableCard'
import _ from 'lodash'

export default {
  name: 'Overview',

  components: {
    Skeleton,
    OverviewTimetableCard
  },

  async created() {
    this.$store.commit('timetables/setBodyBackgroundColor', 'grey-10')
    await this.$store.dispatch('timetables/fetch')
  },

  watch:{
    timetables(val) {
      if(val.length <= 2) {
        this.$store.commit('timetables/setTimetableExpandableIndex', [0, 1])
        return
      }
      this.$store.commit('timetables/setTimetableExpandableIndex', null)
    }
  },

  computed: {
    ...mapState('timetables', ['timetables', 'loading', 'timetableExpandableIndex']),
    ...mapGetters('timetables', ['currentWeekdayLabel']),
  },

  methods: {
    includes(array, element) {
      return _.includes(array, element)
    },

    openTimetable(timetable) {
      this.$store.commit('timetables/setSelectedTimetable', timetable)
      this.$router.push({ 
        name: 'timetables.detail', 
        title: timetable.student,
        params: { 
          timetable: timetable, 
          id: timetable.id || (timetable.student + timetable.season)
        }
      })
    },

    expand(index, value) {
      if(!value) {
        this.$store.commit('timetables/setTimetableExpandableIndex', null)
        return
      }
      this.$store.commit('timetables/setTimetableExpandableIndex', index)
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh; 
  overflow: auto !important;
}
.today {
  font-size: 16px; 
  height: 16px;
  text-align: left;
  width: 100%;
}
.no-timetables-title {
  font-size: 16px;
}
.no-timetables-image {
  background-image: url('../assets/shape.svg');
  width: 100%;
  background-repeat: no-repeat;
  text-align: center;
  background-position: center;
  margin-bottom: -16px;
}
</style>
