<template>
  <div class="overview-timetable-card white grey-70-light-outline">
    <div class="expansion-header ls-d-flex ls-align-items-center px-3" @click="$emit('expand', !expanded)">
      <div class="mr-3 ls-flex-grow-0">
        <img src="@/assets/student.svg" width="32" height="32" />
      </div>
      <div class="ls-flex-grow-1">
        <div class="lead--text bold ellipsis-2" style="line-height: 110%; font-size: 16px;">{{ timetable.student }}</div>
        <div class="lead--text ellipsis-1">{{ timetable.course }}</div>
      </div>
      <div class="ls-flex-grow-0 pl-3">
        <img src="@/assets/arrow-up.svg" v-if="expanded && showExpansionContent" />
        <img src="@/assets/arrow-down.svg" v-else-if='!expanded && showExpansionContent' />
      </div>
    </div>
    <TransitionExpand>
      <div 
        class="expansion-content mx-3" 
        v-if="expanded && showExpansionContent">
        {{ timetable }}
      </div>

      <div 
        class="grey-70--text mx-3 mb-2" 
        v-else-if='!showExpansionContent'>
        Não há horários hoje
      </div>
    </TransitionExpand>
    <div class="mx-3 mb-3">
      <Button 
        @click.native="$emit('openTimetable')"
        label="Ver todos os horários"
        class="mt-2"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import TransitionExpand from '@/components/TransitionExpand'
import Chip from '@/components/Chip'
import Button from '@/components/Button'
import _ from 'lodash'
import parseDate from '@/helpers/parseDate'

export default {
  name: "OverviewTimetableCard",

  components: {
    Button,
    TransitionExpand,
  },

  props: {
    timetable: {
      type: Object,
      required: true
    },

    expanded: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

    }
  },

  computed: {
    hasSchedulesToday() {
      return false
    },

    showExpansionContent() {
      return _.get(this.timetable, 'schedules.length', null) && this.hasSchedulesToday
    }
  },

  methods: {


  }
}
</script>

<style type="text/css" scoped>
.overview-timetable-card {
  min-height: 72px;
  border-radius: 12px;
  width: 100%;
  border: 1px solid;
}
.expansion-header {
  height: 72px;
}
</style>