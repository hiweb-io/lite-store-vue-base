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

      return this.$parent.activeVariant.attributes['option' + this.index] === value;

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

    optionValues() {

      let values = {};

      if (!this.variants || !this.variants.length) {
        return values;
      }

      for (let i = 0; i < this.variants.length; i++) {

        let price = parseInt(this.variants[i].attributes.price*100);

        let optionKey = this.variants[i].attributes['option' + this.index];

        if (typeof values[optionKey] === 'undefined' || price < values[optionKey]) {
          values[optionKey] = price;
        }

      }

      // Sort it
      let sortedValues = {};

      for (let optionValue in price) {
        sortedValues[price] = optionValue;
      }

      return Object.values(sortedValues);

    },

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