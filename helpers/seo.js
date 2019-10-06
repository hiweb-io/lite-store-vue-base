import $ from 'jquery';

class Seo {

  constructor() {

  }

  setTitle(title) {
    $('title').html(title);
  }

  setDescription(description) {
    $('meta[name=description]').attr('content', description);
  }

}

export default new Seo();