export default {

  data() {

    return {

      productsJsonApi: null,
      collectionsJsonApi: null,

      isLoading: false,

      searchTitle: '',
      searchTagName: '',
      searchCollectionId: '',
      sortingMode: 'latest',
      productLimit: 20,
    }

  },

  created() {

    // Import searchTitle from url query
    if (typeof this.$route.query.title !== 'undefined') {
      this.searchTitle = this.$route.query.title;
    }

    // Load collections
    this.$hiwebBase.api.get('collections').then(response => {
      this.collectionsJsonApi = new this.$hiwebBase.JsonApi(response.data);

      // Dispatch global event
      window.dispatchEvent(new CustomEvent('view-product-collection', { detail: this.collectionsJsonApi }));

    });

    this.$hiwebBase.seo.setTitle('All Products' + (this.page > 1 ? ' - Page ' + this.page : ''));

    this.loadProducts();

  },

  methods: {

    loadProducts(page) {

      this.isLoading = true;
        
      let query = {
        limit: this.productLimit,
        'excludes[products]': 'content'
      };

      // Search title
      if (this.searchTitle) {
        query['filter[search]'] = this.searchTitle;
      }

      // Search tag
      if (this.searchTagName) {
        query['filter[tag_name]'] = this.searchTagName;
      }

      // By collection
      if (this.searchCollectionId) {
        query['filter[collection_id]'] = this.searchCollectionId;
      }

      if (page) {
        query.page = page;
      } else {
        query.page = this.page;
      }

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

      this.$hiwebBase.api.get('products', query).then(response => {

        this.isLoading = false;

        if (typeof response.data.data !== 'undefined') {
          this.productsJsonApi = new this.$hiwebBase.JsonApi(response.data);
        }

      }).catch(error => {

        this.isLoading = false;

      });

    }

  },

  computed: {

    page: function() {

      if (typeof this.$route.query.page !== 'undefined') {
        return this.$route.query.page;
      }

      return 1;

    }

  },

  watch: {

    '$route': function() {
      this.loadProducts();
    }

  }

}