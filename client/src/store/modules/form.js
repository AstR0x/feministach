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

      ctx.commit('updateTitle', '');
      ctx.commit('updateContent', '');
      ctx.commit('updateImages', null);
      ctx.commit('toggleOpen');
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
      state.postForm.isValidImages = Boolean(images);
    },
    toggleOpen(state) {
      state.postForm.isOpen = !state.postForm.isOpen;
    },
  },
  state: {
    postForm: {
      title: '',
      content: '',
      isValidTitle: null,
      isValidContent: null,
      isValidImages: null,
      isOpen: false,
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
    isValidTitle(state) {
      return state.postForm.isValidTitle;
    },
    isValidContent(state) {
      return state.postForm.isValidContent;
    },
    isValidImages(state) {
      return state.postForm.isValidImages;
    },
    isOpen(state) {
      return state.postForm.isOpen;
    },
    isDisabled(state) {
      return state.postForm.isDisabled;
    },
  },
};
