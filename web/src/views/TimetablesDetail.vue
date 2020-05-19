<template>
  <div class="ls-container p-3 grey-10 page">
    <ProviderStatusUpdate :provider="selectedTimetable && selectedTimetable.provider" class="mt-2" />

    <div class="selected-weekday ls-d-flex ls-align-items-center" v-if="selectedWeekdayLabel">
      <span class="lead-light--text">{{ selectedWeekdayLabel }}</span>
    </div>

    <div class="schedules-total">
      {{ schedulesTotal }}
    </div>

    <template v-if="selectedWeekday >= 0 && selectedTimetable && schedules && schedules.length">
<!--       <div class="gradebook-term ls-d-flex ls-align-items-start mt-3 mb-2">
        <span class="ls-flex-grow-1 grey-70--text">{{ selectedGradebook.terms[selectedTerm].label }}</span>
        <CurrentTerm
          class="ls-flex-grow-0 ls-flex-shrink-0 ml-2"
          v-if="isCurrentTerm"
        />
      </div>
      <SubjectCard
        v-for="(subject, i) in schedules"
        :key="i"
        :subject="subject"
        @expand="expand(i, $event)"
        class="mb-2"
      /> -->
    </template>

  </div>
</template>

<script>
import ProviderStatusUpdate from '@/components/ProviderStatusUpdate'
import SubjectCard from '@/components/SubjectCard'
import CurrentTerm from '@/components/CurrentTerm'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'TimetablesDetail',

  components: {
    ProviderStatusUpdate,
    // SubjectCard,
    // CurrentTerm,
    // AttachmentCard
  },

  computed: {
    ...mapState('timetables', ['selectedTimetable', 'selectedWeekday']),

    schedules() {
      return []
    },

    selectedWeekdayLabel() {
      return this.selectedWeekday
    },

    schedulesTotal() {
      return '6 horários'
    }
  },
}
</script>

<style scoped>
.page {
  min-height: 100%; 
  overflow-y: auto !important; 
  overflow-x: hidden; 
  margin-top: 33px;
}
.selected-weekday {
  min-height: 32px;
  font-size: 14px;
  line-height: 19px;
}

</style>