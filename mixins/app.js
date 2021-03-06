export default {

	data() {

    return {
      options: {}
    }

  },

  async created() {

    // Dispatch global event
    window.dispatchEvent(new CustomEvent('app-created'));

    // Load site options
    let options = await this.$hiwebBase.api.get('options');

    for (let i = 0; i < options.data.data.length; i++) {
      this.options[options.data.data[i].attributes.option_key] = options.data.data[i].attributes.option_value
    }

    // Save option to store
    this.$hiwebBase.store.commit('options/setOptions', this.options);

    // Load site menus
    let menuErrors = null;
    let menus = await this.$hiwebBase.api.get('menus').catch(e => {
      menuErrors = e;
    });

    // Error occurred
    if (menuErrors) {
      this.$hiwebBase.store.commit('menus/setIsLoading', false);
    } else { // No errors
      this.$hiwebBase.store.commit('menus/setMenus', new this.$hiwebBase.JsonApi(menus.data));
    }

  }

}