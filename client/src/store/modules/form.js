export default {
  actions: {
    async createPost(ctx) {
      const {
        title,
        content,
        isValidTitle,
        isValidContent,
      } = ctx.state.postForm;

      if (isValidTitle && isValidContent) {
        await fetch('/posts', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            content,
            imageURL: 'https://sun9-42.userapi.com/c200528/v200528677/5bc68/FjphHnTkgiA.jpg',
          }),
        });

        ctx.commit('updateTitle', '');
        ctx.commit('updateContent', '');
        ctx.commit('toggleOpen');
      }
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
    isOpen(state) {
      return state.postForm.isOpen;
    },
    isDisabled(state) {
      return state.postForm.isDisabled;
    },
  },
};
