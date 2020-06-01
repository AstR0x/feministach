import Vue from 'vue';
import Router from 'vue-router';

// import AllPosts from './pages/AllPosts.vue';
// import OpenedPost from './pages/OpenedPost.vue';
// import Auth from './pages/Auth.vue';
// import NotFound from './pages/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./pages/AllPosts.vue'),
    },
    {
      path: '/opened/post/:id',
      component: () => import('./pages/OpenedPost.vue'),
    },
    {
      path: '/auth',
      component: () => import('./pages/Auth.vue'),
    },
    {
      path: '*',
      component: () => import('./pages/NotFound'),
    },
  ],
});
