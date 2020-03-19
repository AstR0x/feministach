export default {
  actions: {
    async auth(ctx, { email, password }) {
      const response = await fetch('/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        ctx.commit('updateAuthorization');
      }
    },
  },
  mutations: {
    updateAuthorization(state) {
      state.authorization = !state.authorization;
    },
  },
  state: {
    authorization: false,
  },
  getters: {
    authorization(state) {
      return state.authorization;
    },
  },
};
