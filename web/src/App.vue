<template>
  <div id="app" class="ls-ma-0">
    <div class="content-wrap" :class="bodyBackgroundColor">
      <AppBar class="app-bar-layout" />
      <transition :name="transitionName" mode="out-in">
        <router-view style="padding-top: 72px !important"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar';
import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    AppBar,
  },

  data: () => ({
    transitionName: 'slide-left',
  }),

  computed: {
    ...mapState('timetables', ['bodyBackgroundColor']),
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    },
  },
};
</script>

<style scoped>
.content-wrap {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  max-width: 100%;
  min-height: 100vh;
  position: relative;
}

.app-bar-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
</style>
