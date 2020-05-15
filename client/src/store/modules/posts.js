export default {
  actions: {
    async fetchPosts(ctx) {
      const res = await fetch('/posts');
      const posts = await res.json();
      ctx.commit('updatePosts', posts.reverse());
    },
  },
  mutations: {
    updatePosts(state, originalPosts) {
      state.originalPosts = originalPosts;

      const posts = originalPosts.filter(post => (
        post.title
          .toLowerCase()
          .match(state.filter)
        || post.content
          .toLowerCase()
          .match(state.filter)));

      if (state.isFilteredByAmountOfComments) {
        posts.sort((a, b) => (b.comments.length - a.comments.length));
      }

      state.posts = posts;
    },
    updateFilter(state, filter) {
      state.filter = filter.toLowerCase()
        .trim();
      this.commit('updatePosts', state.originalPosts);
    },
    updateSorting(state) {
      state.isFilteredByAmountOfComments = !state.isFilteredByAmountOfComments;
      this.commit('updatePosts', state.originalPosts);
    },
  },
  state: {
    posts: [],
    originalPosts: [],
    filter: '',
    isFilteredByAmountOfComments: false,
  },
  getters: {
    posts({ posts }) {
      return posts;
    },
  },
};
