<template>
  <button class="ls-attachment-button bold" :class="selected ? 'lead box-shadow-none white--text' : 'lead--text white'">
   <img 
    src="@/assets/paperclip.svg" 
    width="16" 
    height="16" 
    class="mr-1"
    v-if="selected" />

  <img 
    src="@/assets/paperclip-lead.svg" 
    width="16" 
    height="16" 
    class="mr-1"
    v-else /> {{ counter }}
  </button>
</template>

<script type="text/javascript">
export default {
  name: 'AttachmentButton',

  props: {
    selected: {
      type: Boolean,
      default: false
    },

    total: {
      type: Number
    }
  },

  computed: {    
    counter() {
      if(this.total >= 100) {
        return '99+'
      }

      return `(${this.total})`
    }
  }
}
</script>

<style type="text/css" scoped>
.ls-attachment-button {
  font-family: 'Nunito', sans-serif;
  border-radius: 100px;
  padding-left: 8px;
  padding-right: 8px;
  outline: none;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  white-space: nowrap;
  border: none;
  border: 1px solid var(--lead);
}
</style>