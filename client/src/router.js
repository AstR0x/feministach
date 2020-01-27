import Vue from 'vue';
import Router from 'vue-router';

import Main from './pages/Main.vue';
import OpenedPost from './pages/OpenedPost.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      path: '/opened-post/:id',
      component: OpenedPost,
    },
  ],
});
