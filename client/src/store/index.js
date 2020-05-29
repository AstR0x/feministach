import Vue from 'vue';
import Vuex from 'vuex';

import modal from './modules/modal';
import form from './modules/form';
import posts from './modules/posts';
import post from './modules/post';
import auth from './modules/auth';
import sidebar from './modules/sidebar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modal,
    form,
    posts,
    post,
    auth,
    sidebar,
  },
});
