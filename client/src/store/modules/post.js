export default {
  actions: {
    async fetchPost(ctx, id) {
      const res = await fetch(`/posts/${id}`);
      const post = await res.json();

      ctx.commit('updatePost', post);
    },
    async addComment(ctx, id) {
      const formData = new FormData();
      const newComment = ctx.state.openedPost.newComment;
      const images = ctx.state.openedPost.commentImages;

      images.forEach((image) => {
        formData.append('images', image);
      });

      formData.append('newComment', newComment);

      await fetch(`/posts/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        body: formData,
      });

      ctx.dispatch('fetchPost', id);

      ctx.commit('updateComment', '');
      ctx.commit('updateCommentImages', []);
    },
  },
  mutations: {
    updatePost(state, post) {
      state.openedPost.post = post;
    },
    updateComment(state, newComment) {
      state.openedPost.newComment = newComment;
    },
    updateCommentImages(state, commentImages) {
      state.openedPost.commentImages = commentImages;
      state.openedPost.isValidCommentImages = Boolean(commentImages.length) || null;
    },
  },
  state: {
    openedPost: {
      newComment: '',
      post: null,
      commentImages: [],
      isValidCommentImages: null,
    },
  },
  getters: {
    post(state) {
      return state.openedPost.post;
    },
    newComment(state) {
      return state.openedPost.newComment;
    },
    commentImages(state) {
      return state.openedPost.commentImages;
    },
    isValidCommentImages(state) {
      return state.openedPost.isValidCommentImages;
    },
    isValidFormData(state) {
      return state.openedPost.isValidCommentImages || state.openedPost.newComment.trim();
    },
  },
};
