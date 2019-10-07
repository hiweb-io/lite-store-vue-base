import $ from 'jquery';

import cache from './cache';
import JsonApi from './JsonApi';

class Api {

  constructor() {
    
    this.env = process.env.NODE_ENV;

    // Api 
    this.apiUrl = process.env.VUE_APP_API_URL;

    this.isLoading = {};

  }

  get(path, params, loadNew) {

    if (typeof params !== 'object') {
      params = {};
    }

    return new Promise(async (resolve, reject) => {

      // Cache
      let cacheKey = path + JSON.stringify(params);
      if (!loadNew && cache.get(cacheKey)) {
        return resolve(cache.get(cacheKey));
      }

      // If is loading
      if (this.isLoading[cacheKey]) {

        // Wait for it
        return resolve(await new Promise(done => {
        
          let wait = setInterval(() => {

            // Loaded
            if (!this.isLoading[cacheKey]) {
              
              // Stop waiting
              clearInterval(wait);

              return done(this.get(path, params, loadNew));
            
            }

          }, 100);

        }));

      }

      // Set as is loading
      this.isLoading[cacheKey] = true;

      $.ajax({
        url: this.apiUrl + path,
        data: params,
        dataType: 'json',
        error: error => {

          // Stop loading status
          this.isLoading[cacheKey] = false;

          return reject(error);
        },
        success: result => {

          let data = {
            data: result
          };

          // Save to cache
          cache.put(cacheKey, data);

          // If products - cache each one
          if (path === 'products') {
            this.cacheProducts(result);
          }

          // Stop loading status
          this.isLoading[cacheKey] = false;

          return resolve(data);
        }
      });

    });

  }

  post(path, params) {

    if (typeof params !== 'object') {
      params = {};
    }

    return new Promise((resolve, reject) => {

      $.ajax({
        url: this.apiUrl + path,
        type: 'post',
        dataType: 'json',
        contentType: 'application/vnd.api+json',
        headers: {

        },
        data: JSON.stringify(params),

        error: error => {
          return reject(error);
        },

        success: result => {
          return resolve({
            data: result
          });
        }

      });

    });
  }

  patch(path, params) {

    if (typeof params !== 'object') {
      params = {};
    }

    return new Promise((resolve, reject) => {

      $.ajax({
        url: this.apiUrl + path,
        type: 'patch',
        dataType: 'json',
        contentType: 'application/vnd.api+json',
        headers: {

        },
        data: JSON.stringify(params),
        error: error => {
          return reject(error);
        },
        success: result => {
          return resolve({
            data: result
          });
        }
      });

    });

  }

  delete(path, params) {

    if (typeof params !== 'object') {
      params = {};
    }

    return new Promise((resolve, reject) => {

      $.ajax({
        url: this.apiUrl + path,
        type: 'delete',
        dataType: 'json',
        contentType: 'application/vnd.api+json',
        headers: {

        },
        data: JSON.stringify(params),
        error: error => {
          return reject(error);
        },
        success: result => {
          return resolve({
            data: result
          });
        }
      });

    });

  }

  cacheProducts(data) {

    if (!data || typeof data.data === 'undefined' || !data.data.length) {
      return;
    }

    let dataJsonApi = new JsonApi(data);

    for (let i = 0; i < data.data.length; i++) {

      let product = data.data[i];

      // Included data
      let included = [];

      // Merge options
      for (let relationshipResourceKey in product.relationships) {

        let resources = dataJsonApi.findRelationshipResources(product, relationshipResourceKey);

        if (resources) {
          included = included.concat(resources);
        }

      }
      
      // Final data
      let productJsonApi = {
        data: product,
        included: included
      };

      // Save to cache
      cache.put('products/' + product.attributes.slug + JSON.stringify({}), { data: productJsonApi });

    }

  }

}

export default new Api();