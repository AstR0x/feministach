export default {
  actions: {
    async createPost(ctx) {
      const formData = new FormData();

      const {
        title,
        content,
        files,
      } = ctx.state.postForm;

      files.forEach((file) => {
        formData.append('files', file);
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
      ctx.commit('updateFiles', null);
    },
  },
  mutations: {
    updateTitle(state, title) {
      state.postForm.title = title;
      state.postForm.isValidTitle = title.trim().length ? title.trim().length >= 6 : null;
    },
    updateContent(state, content) {
      state.postForm.content = content;
      state.postForm.isValidContent = content.trim().length ? content.trim().length >= 16 : null;
    },
    updateFiles(state, files) {
      state.postForm.files = files;
      state.postForm.isValidFiles = (Boolean(files) && files.length <= 5) || null;
    },
    clearAll(state) {
      state.postForm.title = '';
      state.postForm.content = '';
      state.postForm.files = null;
      state.postForm.isValidTitle = null;
      state.postForm.isValidContent = null;
      state.postForm.isValidFiles = null;
    },
  },
  state: {
    postForm: {
      title: '',
      content: '',
      isValidTitle: null,
      isValidContent: null,
      isValidFiles: null,
      files: null,
    },
  },
  getters: {
    postTitle(state) {
      return state.postForm.title;
    },
    postContent(state) {
      return state.postForm.content;
    },
    postFiles(state) {
      return state.postForm.files;
    },
    isValidTitle(state) {
      return state.postForm.isValidTitle;
    },
    isValidContent(state) {
      return state.postForm.isValidContent;
    },
    isValidFiles(state) {
      return state.postForm.isValidFiles;
    },
    isDisabled(state) {
      return state.postForm.isDisabled;
    },
  },
};
