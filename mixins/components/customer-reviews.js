export default {

  props: ['productId'],

  data() {
    return {

      isLoading: false,
      reviews: {
        data: [],
        included: []
      },

      page: 1,
      limit:20,

      error: false,

    }
  },

  created() {

    if (!this.productId) {
      return;
    }

    this.loadReviews();

  },

  methods: {

    async loadReviews() {

      this.isLoading = true;
      this.error = false;

      if (this.productId) {

        await this.$hiwebBase.api.get('reviews', {
          'page': this.page,
          'limit': this.limit,
          'filter[product_id]' : this.productId,
        }, true).then(response => {
          this.reviews.data = this.reviews.data.concat(response.data.data);
          this.reviews.included = this.reviews.included.concat(response.data.included);
        }).catch(error => {
          if (error.status == 404) {
            this.error = true;
          } else {
            this.isLoading = false;
          }
        });

        if (this.error) {

          await this.$hiwebBase.api.get('reviews', {
            'page': this.page,
            'limit': this.limit,
          }, true).then(response => {
            this.reviews.data = this.reviews.data.concat(response.data.data);
            this.reviews.included = this.reviews.included.concat(response.data.included);
          }).catch(() => {
            this.isLoading = false;
          });

        }

      }

      this.isLoading = false;

    }

  },

  watch: {

    productId: function() {

      this.reviews = {
        data: [],
        included: []
      };

      if (this.page !== 1) {
        this.page = 1; // Page change will auto reload
      } 

      this.loadReviews();
      
    },

    page: function() {
      this.loadReviews();
    }

  },

  computed: {

    reviewsJsonApi: function() {
      return new this.$hiwebBase.JsonApi(this.reviews);
    }

  }

}