const defineModalSize = (width, height) => {
  const { innerHeight, innerWidth } = window;
  const result = {};

  if (innerHeight > innerWidth && height > width) {
    return { sizeIndex: 0, isMobile: true };
  } if (height > width && innerHeight < 900) {
    result.sizeIndex = 0;
  } else if (height * 1.2 > width) {
    result.sizeIndex = 1;
  } else {
    result.sizeIndex = 2;
  }
  result.isMobile = false;

  return result;
};

export default {
  mutations: {
    updateModalData(state, { fileType, url, width, height }) {
      state.modal.fileType = fileType;
      state.modal.url = url;
      state.modal.width = width;
      state.modal.height = height;

      const { sizeIndex, isMobile } = defineModalSize(width, height);

      state.modal.sizeIndex = sizeIndex;
      state.modal.isMobile = isMobile;
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
