<template>
  <div 
    class="provider-last-update grey-70--text ls-d-flex ls-align-items-center ellipsis" 
    :class="!provider || !provider.displayName ? 'hidden' : ''">
    <img 
      v-if="provider && provider.icon"
      :src="provider.icon" 
      class="provider-icon grey-30-outline mr-2" 
      width="24" 
      height="24" 
    />
    <span>Dados Fornecido por {{ provider && provider.displayName }}</span> <b class="ml-1" v-if="lastFetchLabel">{{ lastFetchLabel }}</b>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
import formatRelativeDate from '@/helpers/formatRelativeDate'

export default {
  name: "ProviderStatusUpdate",

  props: {
    provider: {
      type: Object
    }
  },

  computed: {
    ...mapState('timetables', ['lastFetch']),

    lastFetchLabel() {
      return formatRelativeDate(this.lastFetch)
    }
  }
}
</script>

<style type="text/css">
.provider-last-update {
  height: 24px;
  width: 100%;
}
.provider-icon {
  border-radius: 6px;
  border: 1px solid;
  object-fit: cover;
  flex: none;
  white-space: initial;
}
</style>