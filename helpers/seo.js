import $ from 'jquery';
import hiweb from 'lite-store-vue-base';

class Seo {

  constructor() {

  }

  setTitle(title) {
    $('title').html(title + ' - ' + (hiweb.store.state.options.options ? hiweb.store.state.options.options.site_name : ''));
  }

  setDescription(description) {
    $('meta[name=description]').attr('content', description);
  }

}

export default new Seo();