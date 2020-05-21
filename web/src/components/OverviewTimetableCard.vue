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

    <div 
      class="purple--text bold mx-3" 
      v-if="showExpansionContent">
      {{ schedulesTotal }}
    </div>
    <div
      class="grey-70--text mx-3 mb-2" 
      v-else>
      Não há horários hoje
    </div>

    <TransitionExpand v-show="expanded && showExpansionContent">
      <div class="pb-2 mt-3">
        <template v-for="(schedule, i) in schedulesHydrated">
          <div class="schedule-interval mx-3" v-if="schedule == 'interval'" :key="i">
            <div class="interval-dot"><img src="@/assets/dots.svg" width="18" height="24" /></div>
          </div>
          <div class="schedule ls-d-flex ls-align-items-center mx-3 mb-2" :key="i" v-else-if="schedule">
            <img 
              src="@/assets/marker.svg" 
              width="11"
              height="14"
              class="marker"
              v-if="schedule.status == 'now'"
            />

            <!-- Schedule - Start time -->
            <Chip 
              class="mr-3" 
              :color="scheduleChipColor(schedule.status) + '--text'"
              :backgroundColor="scheduleChipBackgroundColor(schedule.status)"
              :label="schedule.formattedStartTime" 
              v-if="schedule.startTime" 
            />

            <!-- Schedule - Label -->
            <Chip 
              class="mr-2 schedule-label" 
              :label="schedule.label" 
              color="link--text"
              backgroundColor="link-light"
              v-if="schedule.label" 
            />

            <!-- Schedule - Title -->
            <div 
              class="ls-flex-grow-1 ls-flex-shrink-1 ellipsis-1" 
              :class="(schedule.status == 'now' ? 'bold ' : '') + scheduleTextColor(schedule.status) + '--text'"
              v-if="schedule.title">
              {{ schedule.status }} {{ schedule.title }}
            </div>
          </div>
        </template>
      </div>
    </TransitionExpand>

    <div class="m-3">
      <Button 
        @click.native="$emit('openTimetable')"
        label="Ver todos os horários"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import TransitionExpand from '@/components/TransitionExpand'
import getCurrentWeekday from '@/helpers/getCurrentWeekday'
import formatTime from '@/helpers/formatTime'
import Button from '@/components/Button'
import Chip from '@/components/Chip'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: "OverviewTimetableCard",

  data() {
    return {
      TWENTY_MINUTES: 1000 * 60 * 20,
      currentScheduleIndex: null,
    }
  },

  components: {
    Button,
    Chip,
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

  computed: {
    ...mapState('timetables', ['weekdays']),

    schedulesHydrated() {
      if(!this.timetable || !this.timetable.schedules || !this.timetable.schedules.length) return []

      let schedules = this.timetable.schedules
        .filter(s => s.weekday == getCurrentWeekday(this.weekdays))
        .map(s => ({ ...s, formattedStartTime: formatTime(s.startTime) }))

      schedules = _.sortBy(schedules, 'formattedStartTime')

      let countIntervals = 0
      const schedulesWithIntervals = [...schedules]

      // Create intervals
      schedules.forEach((s, i) => {
        if(i == 0 && s != 'interval') return
        const diff = this.convertTimeToDate(s.startTime) - this.convertTimeToDate(schedules[i - 1].startTime)

        // Create an interval if the diff between schedules if greater than twenty minutes
        if(diff > this.TWENTY_MINUTES) {
          schedulesWithIntervals.splice(i + countIntervals, 0, 'interval')
          countIntervals++
        }
      })

      schedulesWithIntervals.forEach((s, i) => {
        if(s == 'interval') return
        s.status = this.scheduleStatus(formatTime(s.startTime), i)
      })

      console.log(schedulesWithIntervals)
      return schedulesWithIntervals
    },
 
    schedulesTotal() {
      if(!this.schedulesHydrated || !this.schedulesHydrated.length) return ''

      const schedules = this.schedulesHydrated.length
      return schedules == 1 ? '1 horário hoje' : schedules + ' horários hoje'
    },

    hasSchedulesToday() {
      if(!this.timetable || !this.timetable.schedules || !this.timetable.schedules.length) return false
      return this.timetable.schedules.find((t) => t.weekday == getCurrentWeekday(this.weekdays))
    },

    showExpansionContent() {
      return _.get(this.timetable, 'schedules.length', null) && this.hasSchedulesToday
    },
  },

  methods: {
    convertTimeToDate(time) {
      let date = new Date()
      date.setHours(formatTime(time).split(':')[0])
      date.setMinutes(formatTime(time).split(':')[1])
      date.setSeconds(0)
      date.setMilliseconds(0)
      return date
    },

    scheduleChipColor(status) {
      return {
        'past': 'grey-60',
        'now': 'aqua',
        'future': 'grey-70',
      }[status]
    },

    scheduleChipBackgroundColor(status) {
      return {
        'past': 'grey-20',
        'now': 'aqua-opacity',
        'future': 'grey-20',
      }[status]
    },

    scheduleTextColor(status) {
      return {
        'past': 'grey-60',
        'now': 'aqua',
        'future': 'lead',
      }[status]
    },

    scheduleStatus(time, index) {
      const scheduleStartTime = this.convertTimeToDate(time)
      const now = new Date()
      const isPast = (now - scheduleStartTime) > 0
      const isFuture = (now - scheduleStartTime) <= 0

      if(typeof this.currentScheduleIndex != 'number' && isFuture){
        this.currentScheduleIndex = index
        return 'now'
      }

      return 'future'
    }
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
.schedule-interval {
  height: 24px;
  margin-top: -0.5rem;
}
.interval-dot {
  width: 48px;
  height: 24px;
  display: flex;
  justify-content: center;
}
.schedule-label {
  max-width: 58px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: none;
}
.marker {
  margin-left: -18px;
  margin-right: 6px;
}
</style>