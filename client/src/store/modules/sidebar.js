export default {
  mutations: {
    updatePageBackgroundImage(state, pageBackgroundImage) {
      state.design.pageBackgroundImage = pageBackgroundImage;
    },
    updateInterfaceColor(state, color) {
      state.design.interfaceColor = color;
    },
  },
  state: {
    design: JSON.parse(localStorage.getItem('design'))
      || { interfaceColor: '#dc3545', pageBackgroundImage: null },
  },
  getters: {
    pageBackgroundImage(state) {
      return state.design.pageBackgroundImage;
    },
    interfaceColor(state) {
      return state.design.interfaceColor;
    },
  },
};
