
import cookie from '../../helpers/cookie';

export default {

    // props: ['search', 'excludeIds', 'limit'],
  
    data() {
  
      return {
        isLoading: true,
        recentlyViewedProducts: {
          data: [],
          included: []
        },
        page: 1,
        over: false,
        limit: 20,
        countProducts:null,
        currentLoadProducts:20,
      };
  
    },
  
    created() {
  
      this.loadrecentlyViewedProducts();
  
    },
  
    methods: {
  
      loadrecentlyViewedProducts() {
  
        this.isLoading = true;
        
        let params = {
          limit: this.limit ? this.limit : 20,
          page: this.page,
          sort: '-created_at',
        };

        if (cookie.getCookie('product-ids')) {
            params['filter[ids]'] = cookie.getCookie('product-ids');
        }
  
        // if (this.excludeIds) {
        //   params['filter[exclude_ids]'] = this.excludeIds.join(',');
        // }
  
        // Load related products
        this.$hiwebBase.api.get('products', params, true).then(response => {
  
          this.isLoading = false;
  
          let recentlyViewedProducts = response.data;
  
          this.recentlyViewedProducts.data = this.recentlyViewedProducts.data.concat(recentlyViewedProducts.data);
          this.recentlyViewedProducts.included = this.recentlyViewedProducts.included.concat(recentlyViewedProducts.included);
          this.currentLoadProducts = recentlyViewedProducts.data.length;
          this.countProducts = this.recentlyViewedProducts.data.length;
          this.reInit();
  
        }).catch(error => {
          this.isLoading = false;
          this.over = true;
        });
  
      }
  
    },
  
    watch: {
  
      search: function() {
        this.recentlyViewedProducts = {
          data: [],
          included: []
        };
        this.over = false;
  
        if (this.page !== 1) {
          this.page = 1; // Page change will auto reload
        } else { // Same page, manually reload
          this.loadrecentlyViewedProducts();
        }
        
      },
  
      page: function() {
        this.loadrecentlyViewedProducts();
      }
  
    },
  
    computed: {
  
      recentlyViewedProductsJsonApi: function() {
        return new this.$hiwebBase.JsonApi(this.recentlyViewedProducts);
      }
  
    }
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         