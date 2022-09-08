<template>
  <button
    class="ls-weekday-button cursor-pointer"
    :class="selected ? 'lead border-none white--text' : 'lead-outline lead--text white'"
  >
    {{ label }}
  </button>
</template>

<script type="text/javascript">
export default {
  name: 'WeekdayButton',

  props: {
    selected: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style type="text/css" scoped>
.ls-weekday-button {
  font-family: 'Nunito', sans-serif;
  border-radius: 100px;
  padding-left: 12px;
  padding-right: 12px;
  outline: none;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  white-space: nowrap;
  border: 1px solid;
  flex: 1 1 auto;
}
</style>
