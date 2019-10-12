export default {

  namespaced: true,

  state: {
    options: null
  },

  mutations: {

    setOptions(state, options) {
      state.options = options;
    }

  }

}