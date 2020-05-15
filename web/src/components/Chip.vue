<template>
  <span 
    class="chip"  
    :class="`${colors}-light ${colors}--text`">
    {{label}}
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Chip',
  
  props: {
    color: {
      type: String,
      default: 'neutral'
    },
    label: {
      type: String
    }, 
  },

  computed: {
    colors() {
      return {
        'red': 'danger',
        'neutral': 'grey-70',
        'yellow': 'warning',
        'green': 'success',
      } [this.color] || this.color
    },
  }
}
</script>

<style scoped>
.chip {
  font-weight: 700;
  font-size: 12px;
  border-radius: 4px;
  padding-right: 8px;
  padding-left: 8px;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  white-space: nowrap;
}
</style>