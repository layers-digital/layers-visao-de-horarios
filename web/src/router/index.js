import Vue from 'vue';
import VueRouter from 'vue-router';
import Overview from '../views/Overview.vue';
import TimetablesDetail from '../views/TimetablesDetail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/timetables/:id',
    name: 'timetables.detail',
    component: TimetablesDetail,
    props: true,
  },
  {
    path: '*',
    name: 'overview',
    component: Overview,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
