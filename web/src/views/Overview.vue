<template>
  <div class="ls-container p-3 grey-10" style="min-height: 100vh; overflow: auto !important;">
    <template v-if="timetables && timetables.length">
      <div class="lead-light--text mb-3" style="font-size: 16px; height: 16px;"> 
        Hoje, <b class="current-weekday aqua--text">{{ currentWeekday }}</b>
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
    <template v-else>
      <Skeleton v-for="index in 6" :key="index" class="mb-3" style="opacity: 0.7;" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    await this.$store.dispatch('timetables/fetch')
  },

  watch:{
    timetables(val) {
      if(val.length <= 2) {
        this.$store.commit('timetables/setTimetableExpandableIndex', [0, 1])
      }
    }
  },

  computed: {
    ...mapState('timetables', ['timetables', 'loading', 'timetableExpandableIndex']),

    currentWeekday() {
      var today = new Date();
      var weekday = new Array(7);
      weekday[0] = "Domingo";
      weekday[1] = "Segunda-feira";
      weekday[2] = "Terça-feira";
      weekday[3] = "Quarta-feira";
      weekday[4] = "Quinta-feira";
      weekday[5] = "Sexta-feira";
      weekday[6] = "Sábado";

      return weekday[today.getDay()];
    }
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

</style>
