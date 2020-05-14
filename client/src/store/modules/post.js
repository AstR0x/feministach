export default {
  actions: {
    async fetchPost(ctx, id) {
      const res = await fetch(`/posts/${id}`);
      const data = await res.json();

      ctx.commit('updatePost', data);
    },
    async addComment(ctx, id) {
      ctx.commit('updateCommentIsLoading', true);

      const formData = new FormData();
      const newComment = ctx.state.openedPost.newComment;
      const files = ctx.state.openedPost.commentFiles;

      files.forEach((file) => {
        formData.append('files', file);
      });

      formData.append('newComment', newComment);

      await fetch(`/posts/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        body: formData,
      });

      ctx.dispatch('fetchPost', id);
      ctx.commit('updateComment', '');
      ctx.commit('updateCommentFiles', []);
      ctx.commit('updateCommentIsLoading', false);
    },
  },
  mutations: {
    updatePost(state, post) {
      state.openedPost.post = post;
    },
    updateComment(state, newComment) {
      state.openedPost.newComment = newComment;
    },
    updateCommentFiles(state, commentFiles) {
      state.openedPost.commentFiles = commentFiles;
      state.openedPost.isValidCommentFiles = commentFiles.length ? commentFiles.length <= 5 : null;
    },
    updateCommentIsLoading(state, isLoading) {
      state.openedPost.commentIsLoading = isLoading;
    },
  },
  state: {
    openedPost: {
      newComment: '',
      post: null,
      commentFiles: [],
      isValidCommentFiles: null,
      commentIsLoading: false,
    },
  },
  getters: {
    post(state) {
      return state.openedPost.post;
    },
    newComment(state) {
      return state.openedPost.newComment;
    },
    commentFiles(state) {
      return state.openedPost.commentFiles;
    },
    isValidCommentFiles(state) {
      return state.openedPost.isValidCommentFiles;
    },
    isValidFormData(state) {
      return (state.openedPost.isValidCommentFiles || state.openedPost.newComment.trim())
        && state.openedPost.commentFiles.length <= 5;
    },
    commentIsLoading(state) {
      return state.openedPost.commentIsLoading;
    },
  },
};
