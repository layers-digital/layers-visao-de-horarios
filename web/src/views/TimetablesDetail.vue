<template>
  <div class="ls-container p-3 page">
    <div class="attachments mt-4" v-if="selectedWeekday == 'attachments'">
      <AttachmentCard
        v-for="(attachment, i) in selectedTimetable.attachments"
        :key="i"
        :attachment="attachment"
        class="mb-2"
      />
    </div>

    <template v-else>
      <div class="selected-weekday ls-d-flex ls-align-items-center mt-3" v-if="selectedWeekdayLabel">
        <span class="aqua--text bold">{{ selectedWeekdayLabel }}</span>
      </div>

      <div class="schedules-total mt-2 mb-3 bold lead--text" v-if="schedulesTotal">
        {{ schedulesTotal }}
      </div>

      <template v-if="selectedWeekday && selectedTimetable && schedulesOfDay && schedulesOfDay.length">
        <ScheduleRow
          v-for="(schedule, i) in schedulesOfDay"
          :key="schedule.weekday + i"
          :schedule="schedule"
          class="mb-3"
        />
      </template>

      <div class="grey-30-outline no-schedules white ls-d-flex ls-align-items-center p-3 mt-2" v-else>
        <img src="@/assets/vacation.svg" width="92" height="64" />
        <span class="grey-70--text no-schedules-text ml-3">Não há horários nesse dia :)</span>
      </div>
    </template>
  </div>
</template>

<script>
import AttachmentCard from '@/components/AttachmentCard';
import ScheduleRow from '@/components/ScheduleRow';
import formatTime from '@/helpers/formatTime';
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
import { sendLogEvents } from '@/services/logEvent';

export default {
  name: 'TimetablesDetail',

  components: {
    AttachmentCard,
    ScheduleRow,
  },

  mounted() {
    sendLogEvents('Open View', { viewName: 'TimetablesDetail' });
  },

  computed: {
    ...mapState('timetables', ['selectedTimetable', 'selectedWeekday']),
    ...mapGetters('timetables', ['currentWeekdayLabel', 'currentSelectedDayLabel']),

    schedulesOfDay() {
      const schedules = _.get(this.selectedTimetable, 'schedules', null);
      if (!schedules || !schedules.length) return null;

      let schedulesOfCurrentDay = schedules
        .filter((s) => s.weekday == this.selectedWeekday)
        .map((s) => ({
          ...s,
          formattedStartTime: formatTime(s.startTime),
          formattedEndTime: s.endTime ? formatTime(s.endTime) : null,
        }));

      if (!schedulesOfCurrentDay || !schedulesOfCurrentDay.length) return null;
      schedulesOfCurrentDay = _.sortBy(schedulesOfCurrentDay, 'formattedStartTime');

      return schedulesOfCurrentDay;
    },

    selectedWeekdayLabel() {
      return this.currentWeekdayLabel + ', ' + this.currentSelectedDayLabel;
    },

    schedulesTotal() {
      if (!this.schedulesOfDay || !this.schedulesOfDay.length) return null;
      const total = this.schedulesOfDay.length;
      return total == 1 ? total + ' horário' : total + ' horários';
    },
  },
};
</script>

<style scoped>
.page {
  min-height: 100%;
  overflow-y: auto !important;
  overflow-x: hidden;
  margin-top: 33px;
}
.selected-weekday {
  height: 24px;
  font-size: 18px;
  line-height: 18px;
}
.schedules-total {
  height: 16px;
}
.no-schedules {
  height: 104px;
  border-radius: 12px;
  border: 1px solid;
}
.no-schedules-text {
  font-size: 16px;
}
</style>
