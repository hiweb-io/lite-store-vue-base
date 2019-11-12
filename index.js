import api from './helpers/api';
import cache from './helpers/cache';
import Cart from './helpers/Cart';
import cookie from './helpers/cookie';
import currency from './helpers/currency';
import image from './helpers/image';
import JsonApi from './helpers/JsonApi';
import seo from './helpers/seo';
import router from './helpers/router';

import cartStore from './store/cart';
import optionStore from './store/options';
import menuStore from './store/menus';

import routes from './routes';

// Event bus
import event from './helpers/event';

// Mixins
import breadcrumbMixin from './mixins/components/breadcrumb';
import paginationMixin from './mixins/components/pagination';
import cartItemsMixin from './mixins/components/cart-items';
import navbarMixin from './mixins/components/navbar';
import productBoxMixin from './mixins/components/product-box';
import relatedProductsMixin from './mixins/components/related-products';
import recentlyViewedProductsMixin from './mixins/components/recently-viewed-products';
import popularProductsMixin from './mixins/components/popular-products';

import appMixin from './mixins/app';

import cartMixin from './mixins/cart/index';
import checkoutMixin from './mixins/checkout/index';

import collectionsCollectionMixin from './mixins/collection/collection';
import collectionsDetailMixin from './mixins/collection/detail';

import HomeMixin from './mixins/home/index';

import PagesCollectionMixin from './mixins/page/collection';
import PagesDetailMixin from './mixins/page/detail';

import ProductsCollectionMixin from './mixins/product/collection';
import ProductsDetailMixin from './mixins/product/detail';
import ProductsDetailImagesMixin from './mixins/product/detail-components/images';
import ProductsDetailOptionMixin from './mixins/product/detail-components/option';

const mixins = {

  app: appMixin,

  components: {
    breadcrumb: breadcrumbMixin,
    pagination: paginationMixin,
    cartItems: cartItemsMixin,
    navbar: navbarMixin,
    productBox: productBoxMixin,
    relatedProducts: relatedProductsMixin,
    recentlyViewedProducts: recentlyViewedProductsMixin,
    popularProducts: popularProductsMixin,
  },

  cart: {
    index: cartMixin
  },

  checkout: {
    index: checkoutMixin
  },

  collection: {
    collection: collectionsCollectionMixin,
    detail: collectionsDetailMixin
  },

  home: {
    index: HomeMixin
  },

  page: {
    collection: PagesCollectionMixin,
    detail: PagesDetailMixin
  },

  product: {
    collection: ProductsCollectionMixin,
    detail: ProductsDetailMixin,
    components: {
      images: ProductsDetailImagesMixin,
      option: ProductsDetailOptionMixin
    }
  }

};

const base = {
	api, cache, cookie, currency, image, JsonApi, seo, router
}

export default {

  routes, mixins,

  install(Vue, { store }) {

    // Add store to base
    base.store = store;

    // Event
    base.event = event;

    // Register vuex module
    store.registerModule('cart', cartStore);
    store.registerModule('options', optionStore);
    store.registerModule('menus', menuStore);

    // Inject store to cart
    const cart = new Cart(store);
    base.cart = cart;

    // Export vue to global
    base.Vue = Vue;

    // Inject mixin global event
    Vue.mixin({

      created() {

        // Router push global event
        if (typeof window.globalRouterPushEvent === 'undefined') {

          // Event register
          window.globalRouterPushEvent = true;

          window.addEventListener('router-push', event => {

            this.$router.push(event.detail);

          });

        }

      },

      // Cart data in global
      computed: {

        isLoadingCart: function() {
          return this.$store.state.cart.isLoadingCart;
        },

        cart: function() {
          return this.$store.state.cart.cart;
        },

        cartJsonApi: function() {
          return this.$store.state.cart.cartJsonApi;
        }

      }

    });

    // Load cart
    base.cart.get();

    Vue.prototype.$hiwebBase = base;

    // Attach to window global variable for global code usages
    window.$hiwebBase = base;

  }

}