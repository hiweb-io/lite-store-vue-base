
import cookie from '../../helpers/cookie';

export default {

    props: ['limit'],
  
    data() {
  
      return {
        isLoading: true,
        popularProducts: {
          data: [],
          included: []
        },
        page: 1,
        over: false,
      };
  
    },
  
    created() {
  
      this.loadPopularProducts();
  
    },
  
    methods: {
  
      loadPopularProducts() {
  
        this.isLoading = true;
        
        let params = {
          limit: this.limit ? this.limit : 20,
          page: this.page,
          sort: '-order_count',
        };

  
        // if (this.excludeIds) {
        //   params['filter[exclude_ids]'] = this.excludeIds.join(',');
        // }
  
        // Load related products
        this.$hiwebBase.api.get('products', params, true).then(response => {
  
          this.isLoading = false;
  
          let popularProducts = response.data;
  
          this.popularProducts.data = this.popularProducts.data.concat(popularProducts.data);
          this.popularProducts.included = this.popularProducts.included.concat(popularProducts.included);
  
        }).catch(error => {
          this.isLoading = false;
          this.over = true;
        });
  
      }
  
    },
  
    watch: {
  
      search: function() {
        this.popularProducts = {
          data: [],
          included: []
        };
        this.over = false;
  
        if (this.page !== 1) {
          this.page = 1; // Page change will auto reload
        } else { // Same page, manually reload
          this.loadPopularProducts();
        }
        
      },
  
      page: function() {
        this.loadPopularProducts();
      }
  
    },
  
    computed: {
  
      popularProductsJsonApi: function() {
        return new this.$hiwebBase.JsonApi(this.popularProducts);
      }
  
    }
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         