export default {

  props: ['option', 'variants', 'index'],

  data() {

    return {
      selectedOptionValue: null
    };

  },

  created() {

    // If only 1 variant available
    if (this.variants.length === 1) {
      this.selectedOptionValue = this.variants[0].attributes['option' + this.index];
    }

  },

  methods: {

    /**
    * Check option value is active
    */
    checkOptionValueActive(value) {

      if (!this.$parent.activeVariant) {
        return false;
      }

      return this.$parent.activeVariant.attributes['option' + (index+1)] === value;

    },

    getOptionGuide() {

      return new Promise((resolve, reject) => {

        if (!this.option.option_guide_id) {
          return resolve(null)
        }

        this.$hiwebBase.api.get('option_guides/' + this.option.option_guide_id).then(response => {
          return resolve(response.data.data);
        }).catch(error => {
          return reject(error);
        });

      });

    }

  },

  watch: {

    selectedOptionValue: function(value) {
      this.$parent.selectedOptions['option' + this.index] = value;
    }

  },

  computed: {

    activeVariant: {

      get: function() {
        return this.$parent.activeVariant;
      },

      set: function(value) {
        this.$parent.activeVariant = value;
      }

    }

  }

}