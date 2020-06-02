import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "AllPosts" */ './pages/AllPosts.vue'),
    },
    {
      path: '/opened/post/:id',
      component: () => import(/* webpackChunkName: "OpenedPost" */ './pages/OpenedPost.vue'),
    },
    {
      path: '/auth',
      component: () => import(/* webpackChunkName: "Auth" */ './pages/Auth.vue'),
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'),
    },
  ],
});
