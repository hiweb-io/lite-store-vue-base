import api from '../../helpers/api';
import JsonApi from '../../helpers/JsonApi';

export default {

  data() {

    return {
      isLoading: true,
      cartItemsJsonApi: null,
      searchString: null
    };

  },

  async created() {

    this.loadCartItems();

  },

  methods: {

    async loadCartItems() {
      
      this.isLoading = true;
      this.cartItemsJsonApi = null;

      if (this.cart.data.id) {

        // Load data
        let error = null;
        let cartItems = await api.get('carts/' + this.cart.data.id + '/cart_items', {
          'excludes[products]': 'content'
        }, true).catch(e => {
          error = e;
        });

        if (error) {
          this.isLoading = false;
          return;
        }

        this.cartItemsJsonApi = new JsonApi(cartItems.data);
        this.isLoading = false;

      } else {
        this.isLoading = false;
        return;
      }

      this.getSearchString();

    },

    findVariant(cartItem) {
      return this.cartItemsJsonApi.findRelationshipResource(cartItem, 'variant');
    },

    findProduct(cartItem) {
      return this.cartItemsJsonApi.findRelationshipResource(this.findVariant(cartItem), 'product');
    },

    getVariantTitle(cartItem) {

      let variant = this.findVariant(cartItem);

      let title = '';

      for (let i = 0; i <= 3; i++) {

        if (variant.attributes['option' + i]) {

          if (i > 1) {
            title += ' - ';
          }

          title += variant.attributes['option' + i];

        }

      }

      return title;

    },

    async updateQty(variantId, qty) {

      if (qty < 1) {
        return;
      }

      this.isLoading = true;

      await this.$hiwebBase.cart.add(variantId, qty);

      // Reload
      this.loadCartItems();

    },

    async deleteCartItem(cartItemId) {
      this.isLoading = true;
      await this.$hiwebBase.cart.delete(cartItemId);
      this.loadCartItems();
      this.isLoading = false;
    },

    getSearchString() {

      let tagIds = [];
      let titleSearch = [];

      for (let i = 0; i < this.cartItemsJsonApi.document.included.length; i++) {

        // Find products
        if (this.cartItemsJsonApi.document.included[i].type === 'products') {
          
          // Find tag ids
          for (let k = 0; k < this.cartItemsJsonApi.document.included[i].relationships.tags.data.length; k++) {
            tagIds.push(this.cartItemsJsonApi.document.included[i].relationships.tags.data[k].id);
          }

          // Find title words
          let words = this.cartItemsJsonApi.document.included[i].attributes.title.split(' ');

          // If word not in title search yet
          for (let z = 0; z <= words.length; z++) {

            if (titleSearch.indexOf(words[z]) === -1) {
              titleSearch.push(words[z]);
            }

          }

        }

      }

      // Search string
      let search = '';

      // Load tags
      if (tagIds.length) {
        
        api.get('tags', {
          'filter[ids]': tagIds.join()
        }).then(response => {

          for (let i = 0; i < response.data.data.length; i++) {
            search += response.data.data[i].attributes.name + ' ';
          }

          

        });

      } 

      if (titleSearch.length) {
        search += ' ' + titleSearch.join(' ');
      }

      this.searchString = search;
        
    }

  },

  computed: {

    totalPrice: function() {

      let total = 0;

      if (!this.cartJsonApi || !this.cart) {
        return total;
      }

      let cartItems = this.cartJsonApi.findRelationshipResources(this.cart.data, 'cart_items');

      if (!cartItems || !cartItems.length) {
        return total;
      }

      for (let i = 0; i < cartItems.length; i++) {
        total += this.findVariant(cartItems[i]).attributes.price * cartItems[i].attributes.quantity;
      }

      return total;

    }

  }

};