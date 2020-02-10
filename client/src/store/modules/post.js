export default {
  actions: {
    async fetchPost(ctx, id) {
      const res = await fetch(`/posts/${id}`);
      const post = await res.json();

      ctx.commit('updatePost', post);
    },
    async addComment(ctx, id) {
      const comments = ctx.state.openedPost.post.comments.slice();
      const newComment = ctx.state.openedPost.newComment;

      comments.push({ content: newComment });

      await fetch(`/posts/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments }),
      });

      ctx.commit('updateComment', '');
    },
  },
  mutations: {
    updatePost(state, post) {
      state.openedPost.post = post;
    },
    updateComment(state, newComment) {
      state.openedPost.newComment = newComment;
    },
  },
  state: {
    openedPost: {
      post: null,
      newComment: '',
    },
  },
  getters: {
    post(state) {
      return state.openedPost.post;
    },
    newComment(state) {
      return state.openedPost.newComment;
    },
  },
};
