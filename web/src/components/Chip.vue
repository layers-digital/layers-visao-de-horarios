<template>
  <span 
    class="chip bold"  
    :class="`${background}-light ${color}`">
    {{label}}
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Chip',
  
  props: {
    backgroundColor: {
      type: String,
      default: 'neutral'
    },
    color: {
      type: String,
      default: 'lead--text'
    },
    label: {
      type: String
    }, 
  },

  computed: {
    background() {
      return {
        'neutral': 'grey-70',
      } [this.backgroundColor] || this.backgroundColor
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