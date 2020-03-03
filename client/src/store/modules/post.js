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
      const images = ctx.state.openedPost.images;

      images.forEach((image) => {
        formData.append('images', image);
      });

      formData.append('newComment', newComment);

      await fetch(`/posts/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        body: formData,
      });

      ctx.commit('updateComment', '');
      ctx.commit('updateImages', null);
    },
  },
  mutations: {
    updatePost(state, post) {
      state.openedPost.post = post;
    },
    updateComment(state, newComment) {
      state.openedPost.newComment = newComment;
    },
    updateImages(state, images) {
      state.openedPost.images = images;
      state.openedPost.isValidImages = Boolean(images) || null;
      console.log(state.openedPost.isValidImages);
      console.log(state.openedPost.images);
    },
  },
  state: {
    openedPost: {
      newComment: '',
      post: null,
      images: null,
      isValidImages: null,
    },
  },
  getters: {
    post(state) {
      return state.openedPost.post;
    },
    newComment(state) {
      return state.openedPost.newComment;
    },
    images(state) {
      return state.openedPost.images;
    },
    isValidImages(state) {
      return state.openedPost.isValidImages;
    },
  },
};
