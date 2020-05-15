<template>
  <button class="ls-term-button" :class="selected ? 'lead border-none white--text' : 'lead-outline lead--text white'">
    <img v-if="icon == 'location'" src="@/assets/location.svg" class="mr-1" />
    {{ label }}
  </button>
</template>

<script type="text/javascript">
export default {
  name: 'TermButton',

  props: {
    icon: {
      type: String
    },

    selected: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style type="text/css" scoped>
.ls-term-button {
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
}
</style>