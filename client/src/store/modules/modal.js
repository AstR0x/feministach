export default {
  mutations: {
    updateModalData(state, { fileType, url, width, height }) {
      state.modal.fileType = fileType;
      state.modal.url = url;
      state.modal.width = width;
      state.modal.height = height;

      if (window.innerHeight > window.innerWidth && height > width) {
        state.modal.sizeIndex = 0;
        state.modal.isMobile = true;
      } else if (height > width && window.innerHeight < 900) {
        state.modal.isMobile = false;
        state.modal.sizeIndex = 0;
      } else if (height > width) {
        state.modal.isMobile = false;
        state.modal.sizeIndex = 1;
      } else if (height * 1.2 > width) {
        state.modal.isMobile = false;
        state.modal.sizeIndex = 1;
      } else {
        state.modal.sizeIndex = 2;
        state.modal.isMobile = false;
      }
    },
    updateSizeIndex(state, sizeIndex) {
      state.modal.sizeIndex = sizeIndex;
    },
  },
  state: {
    modal: {
      fileType: null,
      url: null,
      height: null,
      width: null,
      sizeIndex: null,
      isMobile: false,
    },
  },
  getters: {
    modalData(state) {
      return state.modal;
    },
  },
};
