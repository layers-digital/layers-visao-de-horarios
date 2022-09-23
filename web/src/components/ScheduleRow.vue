<template>
  <div class="ls-d-flex" v-if="schedule">
    <div class="schedule-time mr-3">
      <Chip
        color="lead--text"
        backgroundColor="grey-30"
        :label="schedule.formattedStartTime"
        v-if="schedule.startTime && schedule.formattedStartTime"
      />
      <div class="end-time lead--text" v-if="schedule.endTime && schedule.formattedEndTime">
        {{ schedule.formattedEndTime }}
      </div>
    </div>

    <div class="schedule-info grey-30-outline p-3 white">
      <Chip
        class="mb-2"
        color="link--text"
        backgroundColor="link-light"
        :label="schedule.label"
        v-if="schedule.label"
      />
      <div class="purple--text bold schedule-title" v-if="schedule.title">
        {{ schedule.title }}
      </div>
      <div class="grey-70--text mt-2 schedule-location" v-if="schedule.location">
        {{ schedule.location }}
      </div>
      <div class="grey-70--text mt-2 schedule-caption" v-if="schedule.caption">
        {{ schedule.caption }}
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Chip from '@/components/Chip';

export default {
  name: 'ScheduleRow',

  components: {
    Chip,
  },

  props: {
    schedule: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style type="text/css" scoped>
.schedule-time {
  width: 48px;
  flex: none;
}
.end-time {
  font-size: 12px;
  text-align: center;
  height: 24px;
  line-height: 24px;
}
.schedule-info {
  border: 1px solid;
  min-height: 48px;
  border-radius: 12px;
  width: 100%;
}
.schedule-title {
  line-height: 110%;
}
.schedule-location,
.schedule-caption {
  line-height: 120%;
}
</style>
