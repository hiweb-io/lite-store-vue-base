export default {

  props: ['slug'],

  data() {
    return {
      isLoading: false,
      
      collectionJsonApi: null,
      collectionsJsonApi: null,
      
      productsJsonApi: null,
      isLoadingProducts: false,

      productLimit: 24,
      sortingMode: '',
      error: null
    }
  },

  async created() {

    let collections = await this.$hiwebBase.api.get('collections').catch(e => {});
    this.collectionsJsonApi = new this.$hiwebBase.JsonApi(collections.data);

    // Load collection
    this.loadCollection();
  },

  methods: {

    loadCollection() {

      this.isLoading = true;
      this.collectionJsonApi = null;

      this.$hiwebBase.api.get('collections/' + this.slug).then(response => {

        if (typeof response.data.data !== 'undefined') {
          this.collectionJsonApi = new this.$hiwebBase.JsonApi(response.data);
        }

        // Dispatch global event
        window.dispatchEvent(new CustomEvent('view-collection-detail', { detail: this.collectionJsonApi }));

        // SEO
        this.$hiwebBase.seo.setTitle(this.collectionJsonApi.document.data.attributes.title);
        this.$hiwebBase.seo.setDescription(this.collectionJsonApi.document.data.attributes.description);

        // Load products
        this.loadProducts();

        this.isLoading = false;

      }).catch(error => {

        this.error = typeof error.response !== 'undefined' ? error.response.data.errors[0].title : error.message;
        this.isLoading = false;

      });

    },

    loadProducts() {

      this.productsJsonApi = null;

      let query = {
        'filter[collection_id]': this.collectionJsonApi.document.data.id,
        limit: this.productLimit,
        page: this.page,
        'excludes[products]': 'content'
      };

      switch (this.sortingMode) {

        case 'best-seller':
          query.sort = '-order_count';
        break;

        case 'price-high-to-low':
          query.sort = '-min_price';
        break;

        case 'price-low-to-high':
          query.sort = 'min_price';
        break;

        default:
          query.sort = '-created_at';
        break;

      }

      this.isLoadingProducts = true;
      this.$hiwebBase.api.get('products', query).then(response => {

        if (typeof response.data.data !== 'undefined' && response.data.data.length) {
          this.productsJsonApi = new this.$hiwebBase.JsonApi(response.data);
        } else {
          this.productsJsonApi = null;
        }

        this.isLoadingProducts = false;

      }).catch(error => {
        this.productsJsonApi = null;
        this.isLoadingProducts = false;
      });
    }

  },

  watch: {

    sortingMode: function() {
      this.loadProducts();
    },

    '$route': function() {
      this.loadCollection();
    }

  },

  computed: {

    page: function() {

      if (typeof this.$route.query.page !== 'undefined') {
        return this.$route.query.page;
      }

      return 1;

    },

    childCollections: function() {

      let collectionsJsonApi = this.collectionsJsonApi;

      if (!collectionsJsonApi) {
        return [];
      }

      let childCollections = [];

      for (let i = 0; i < collectionsJsonApi.document.data.length; i++) {

        if (collectionsJsonApi.document.data[i].attributes.parent_id === this.collectionJsonApi.document.data.id) {
          childCollections.push(collectionsJsonApi.document.data[i]);
        }

      }

      return childCollections;

    }

  }

}