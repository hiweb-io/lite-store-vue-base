export default {

  props: ['search', 'excludeIds', 'limit'],

  data() {

    return {
      isLoading: true,
      relatedProducts: {
        data: [],
        included: []
      },
      page: 1,
      over: false,
    };

  },

  created() {

    if (!this.search) {
      return;
    }

    this.loadRelatedProducts();

  },

  methods: {

    loadRelatedProducts() {

      this.isLoading = true;

      let params = {
        'filter[search]': this.search,
        limit: this.limit ? this.limit : 8,
        page: this.page,
        sort: '-created_at',
      };

      if (this.excludeIds) {
        params['filter[exclude_ids]'] = this.excludeIds.join(',');
      }

      // Load related products
      this.$hiwebBase.api.get('products', params, true).then(response => {

        this.isLoading = false;

        let relatedProducts = response.data;

        this.relatedProducts.data = this.relatedProducts.data.concat(relatedProducts.data);
        this.relatedProducts.included = this.relatedProducts.included.concat(relatedProducts.included);

      }).catch(error => {
        this.isLoading = false;
        this.over = true;
      });

    }

  },

  watch: {

    search: function() {
      this.relatedProducts = {
        data: [],
        included: []
      };
      this.over = false;

      if (this.page !== 1) {
        this.page = 1; // Page change will auto reload
      } else { // Same page, manually reload
        this.loadRelatedProducts();
      }
      
    },

    page: function() {
      this.loadRelatedProducts();
    }

  },

  computed: {

    relatedProductsJsonApi: function() {
      return new this.$hiwebBase.JsonApi(this.relatedProducts);
    }

  }
}