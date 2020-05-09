import Vue from 'vue';
import Router from 'vue-router';

import AllPosts from './pages/AllPosts.vue';
import OpenedPost from './pages/OpenedPost.vue';
import Auth from './pages/Auth.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: AllPosts,
    },
    {
      path: '/opened/post/:id',
      component: OpenedPost,
    },
    {
      path: '/auth',
      component: Auth,
    },
  ],
});
