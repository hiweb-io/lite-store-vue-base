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
    this.$hiwebBase.store.commit('options/options', this.options);

  }

}