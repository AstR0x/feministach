export default {
  actions: {
    async fetchPosts(ctx) {
      const res = await fetch('/posts');
      const posts = await res.json();

      posts.sort((a, b) => a.comments.length - b.comments.length);
      console.log(posts);

      ctx.commit('updatePosts', posts.reverse());
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
