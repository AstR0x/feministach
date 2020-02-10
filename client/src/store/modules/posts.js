export default {
  actions: {
    async fetchPosts(ctx) {
      const res = await fetch('/posts');
      const posts = await res.json();

      ctx.commit('updatePosts', posts);
    },
  },
  mutations: {
    updatePosts(state, posts) {
      state.allPosts = posts;
      state.filteredPosts = posts;
    },
    filterPosts(state, filter) {
      state.filteredPosts = state.allPosts.filter(
        ({ title, content }) => title.includes(filter) || content.includes(filter),
      );
    },
  },
  state: {
    allPosts: [],
    filteredPosts: [],
  },
  getters: {
    posts({ filteredPosts }) {
      return filteredPosts;
    },
  },
};
