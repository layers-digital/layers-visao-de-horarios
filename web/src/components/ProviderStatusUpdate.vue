<template>
  <div
    class="provider-last-update grey-70--text ls-d-flex ls-align-items-center"
    :class="!provider || !provider.displayName ? 'hidden' : ''"
  >
    <img
      v-if="provider && provider.icon"
      :src="provider.icon"
      class="provider-icon grey-30-outline mr-2 ls-flex-grow-0 s-flex-shrink-0"
      width="24"
      height="24"
    />
    <div class="ellipsis-2 ls-flex-grow-1 ls-flex-shrink-1 provider-info">
      <span>Dados fornecidos por {{ providerName }}</span>
      <b v-if="lastFetchLabel">{{ lastFetchLabel }}</b>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import formatRelativeDate from '@/helpers/formatRelativeDate';

export default {
  name: 'ProviderStatusUpdate',

  props: {
    provider: {
      type: Object,
    },
  },

  computed: {
    ...mapState('timetables', ['lastFetch']),

    providerName() {
      return `${this.provider && this.provider.displayName} `;
    },

    lastFetchLabel() {
      return formatRelativeDate(this.lastFetch);
    },
  },
};
</script>

<style type="text/css">
.provider-last-update {
  height: 24px;
  width: 100%;
  font-size: 12px;
  line-height: 13px;
}
.provider-icon {
  border-radius: 6px;
  border: 1px solid;
  object-fit: cover;
  flex: none;
  white-space: initial;
}
.provider-info {
  max-height: 24px;
}
</style>
