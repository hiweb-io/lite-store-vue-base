import JsonApi from '../helpers/JsonApi';

export default {

  namespaced: true,

  state: {
    options: null
  },

  mutations: {

    options(state, options) {
      state.options = options;
    }

  }

}