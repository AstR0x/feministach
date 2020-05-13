export default {
  mutations: {
    updateModalData(state, { type, url }) {
      state.modal.type = type;
      state.modal.url = url;
    },
  },
  state: {
    modal: {
      type: null,
      url: null,
    },
  },
  getters: {
    modalType(state) {
      return state.modal.type;
    },
    modalUrl(state) {
      return state.modal.url;
    },
  },
};
