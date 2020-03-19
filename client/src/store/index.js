import Vue from 'vue';
import Vuex from 'vuex';

import form from './modules/form';
import posts from './modules/posts';
import post from './modules/post';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    form,
    posts,
    post,
    auth,
  },
});
