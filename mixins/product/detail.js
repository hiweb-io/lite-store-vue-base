import cookie from '../../helpers/cookie';

export default {

  props: ['slug'],

  data() {

    return {
      
      productJsonApi: null,

      activeVariant: null,

      selectedOptions: {
        option1: null,
        option2: null,
        option3: null
      },

      showOptionWarning: false,
      
      qty: 1,

      addingToCart: false,

      error: null,
      isLoading: false,

    };

  },

  created() {

    this.loadData();

    // Listen to message event
    window.addEventListener('options-updated', () => {
      this.$forceUpdate();
    });


  },

  methods: {

    async loadData() {
      
      this.productJsonApi = null;
      this.activeVariantId = null;
      this.activeVariant = null;
      this.error = null;
      this.isLoading = true;

      // If cache exists
      let cacheKey = 'products/' + this.slug + JSON.stringify({});
      let cache = this.$hiwebBase.cache.get(cacheKey);
      if (cache !== null) {
        this.productJsonApi = new this.$hiwebBase.JsonApi(cache.data);
        this.isLoading = false;
      }

      // data
      let find;

      if (typeof window.productData !== 'undefined' && typeof window.productData[this.slug] !== 'undefined') {
        find = {data: window.productData[this.slug]};
      } else {

        find = await this.$hiwebBase.api.get('products/' + this.slug, {}, true).catch(error => {
          this.error = error;
        });

        // Save data
        if (!this.error && typeof window.productData !== 'undefined') {
          window.productData[this.slug] = find.data;
        }

      }

      if (this.error) {
        return;
      }

      // SEO
      this.$hiwebBase.seo.setTitle(find.data.data.attributes.title);
      this.$hiwebBase.seo.setDescription(find.data.data.attributes.description);

      // Json Api data
      this.productJsonApi = new this.$hiwebBase.JsonApi(find.data);

      // Dispatch global event
      window.dispatchEvent(new CustomEvent('view-product-detail', { detail: this.productJsonApi }));

      // Set active variant
      this.setActiveVariant();
      if (!cookie.getCookie('product-ids')) {
        cookie.setCookie('product-ids', this.productJsonApi.document.data.id)
      }else{
        var productIds = cookie.getCookie('product-ids');
        if (!productIds.includes(this.productJsonApi.document.data.id)) {
          productIds += ','+this.productJsonApi.document.data.id;
          cookie.setCookie('product-ids', productIds);
          
        }
      }

      this.isLoading = false;

    },

    setActiveVariant: function() {

      // If no options and has one variant
      if (this.productJsonApi.document.data.relationships.variants.data.length === 1) {
        this.activeVariant = this.productJsonApi.findRelationshipResource(this.productJsonApi.document.data, 'variants');
      }
      
    },

    changeQty(number) {
      this.qty += number;
    },

    async addToCart() {

      if (!this.allOptionsSelected) {
        return this.optionsReminder();
      }

      if (!this.activeVariant || this.activeVariant.attributes.status !== 'available') {
        return this.outOfStock();
      }

      this.addingToCart = true;

      let error = null;

      let cartItem = await this.$hiwebBase.cart.add(this.activeVariant.id, this.qty).catch(error => {
        error = true;
      });

      this.addingToCart = false;

      if (!error && cartItem && typeof cartItem === 'object') {
        // Redirect to cart page
        this.$router.push({ name: 'cart.index' });
      }

      // Dispatch event
      window.dispatchEvent(new Event('add-to-cart'));

    },

    optionsReminder() {
      alert('Please select all options');
      this.showOptionWarning = true;
    },

    outOfStock() {
      alert('Sorry, this item is out of stock or not available at the moment');
    }

  },

  watch: {

    qty: function() {
      if (this.qty < 1) {
        this.qty = 1;
      }
    },

    slug: function() {
      this.loadData();
    },

    selectedOptionsWatcher: function() {

      // Find active variant
      for (let i = 0; i < this.variants.length; i++) {

        if (this.variants[i].attributes.option1 === this.selectedOptions.option1
          && this.variants[i].attributes.option2 === this.selectedOptions.option2
          && this.variants[i].attributes.option3 === this.selectedOptions.option3
          ) {
          this.activeVariant = this.variants[i];
          return;
        }

      }

      this.activeVariant = null;

    }

  },

  computed: {

    variants: function() {
    
      let variants = this.productJsonApi.findRelationshipResources(this.productJsonApi.document.data, 'variants');
        
      return variants ? variants : [];

    },

    images: function() {
      return this.productJsonApi.findRelationshipResources(this.productJsonApi.document.data, 'images');
    },

    searchString: function() {

      let search = '';

      // Tag
      search = this.productJsonApi.document.data.attributes.title;

      // Collection
      let collectionWords = [];
      let collections = this.productJsonApi.findRelationshipResources(this.productJsonApi.document.data, 'collections');
      if (collections) {

        for (let i = 0; i < collections.length; i++) {
          
          let collectionTitle = collections[i].attributes.title.toLowerCase();
          collectionTitle = collectionTitle.split(' ');

          for (let k = 0; k < collectionTitle.length; k++) {

            if (collectionWords.indexOf(collectionTitle[k]) === -1) {
              collectionWords.push(collectionTitle[k]);
            }

          }

        }

      }

      search = search.toLowerCase().split(' ');

      for (let i = 0; i < search.length; i++) { 

        // Remove collection word
        if (collectionWords.indexOf(search[i]) !== -1) {
          search.splice(i, 1);
          i--;
        }

      }

      return search.join(' ');

    },  

    tagIds: function() {

      let tagIds = [];
      let tags = this.productJsonApi.findRelationshipResources(this.productJsonApi.document.data, 'tags');

      if (!tags) {
        return [];
      }

      for (let i = 0; i < tags.length; i++) {
        tagIds.push(tags[i].id);
      }

      return tagIds;

    },

    allOptionsSelected() {

      for (let i = 1; i <= 3; i++) {

        if (this.productJsonApi.document.data.attributes['option' + i] && !this.selectedOptions['option' + i]) {
          return false;
        }

      }

      return true;

    },

    selectedOptionsWatcher: function() {
      return JSON.stringify(this.selectedOptions);
    }

  }

}