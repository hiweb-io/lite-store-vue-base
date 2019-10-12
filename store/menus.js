export default {

  namespaced: true,

  state: {
    isLoading: true,
    menus: null
  },

  mutations: {

    setMenus(state, menus) {
      state.menus = menus;
      state.isLoading = false;
    },

    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    }

  }

}