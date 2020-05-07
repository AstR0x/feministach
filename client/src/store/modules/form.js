export default {
  actions: {
    async createPost(ctx) {
      const formData = new FormData();

      const {
        title,
        content,
        images,
      } = ctx.state.postForm;

      images.forEach((image) => {
        formData.append('images', image);
      });

      formData.append('title', title);
      formData.append('content', content);

      await fetch('/posts', {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });

      ctx.dispatch('fetchPosts');

      ctx.commit('updateTitle', '');
      ctx.commit('updateContent', '');
      ctx.commit('updateImages', null);
    },
  },
  mutations: {
    updateTitle(state, title) {
      state.postForm.title = title;
      state.postForm.isValidTitle = title.length ? title.length >= 6 : null;
    },
    updateContent(state, content) {
      state.postForm.content = content;
      state.postForm.isValidContent = content.length ? content.length >= 16 : null;
    },
    updateImages(state, images) {
      state.postForm.images = images;
      state.postForm.isValidImages = Boolean(images) || null;
    },
    clearAll(state) {
      state.postForm.title = '';
      state.postForm.content = '';
      state.postForm.images = null;
      state.postForm.isValidTitle = null;
      state.postForm.isValidContent = null;
      state.postForm.isValidImages = null;
    },
  },
  state: {
    postForm: {
      title: '',
      content: '',
      isValidTitle: null,
      isValidContent: null,
      isValidImages: null,
      images: null,
    },
  },
  getters: {
    postTitle(state) {
      return state.postForm.title;
    },
    postContent(state) {
      return state.postForm.content;
    },
    postImages(state) {
      return state.postForm.images;
    },
    isValidTitle(state) {
      return state.postForm.isValidTitle;
    },
    isValidContent(state) {
      return state.postForm.isValidContent;
    },
    isValidImages(state) {
      return state.postForm.isValidImages;
    },
    isDisabled(state) {
      return state.postForm.isDisabled;
    },
  },
};
