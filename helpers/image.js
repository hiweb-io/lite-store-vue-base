class Image {

  url(image, baseUrl) {

    if (typeof image === 'string' && image.substring(0, 4) === 'http') {
      return image;
    }

    let path;

    baseUrl = baseUrl ? baseUrl : 'https://storage.googleapis.com/fulfill/';

    if (typeof image === 'string') {
      path = baseUrl + image;
    } else if (image && typeof image === 'object' && typeof image.id !== 'undefined') {

      if (image.attributes.path.substring(0, 4) === 'http') {
        path = image.attributes.path;
      } else {
        path = baseUrl + image.attributes.path;
      }

    } else {
      path = baseUrl + 'assets/default.png';
    }

    return path;
  }

  resize(image, size, crop) {

    let resizeUrl = 'https://clickfulfill.appspot.com/';

    size = size > 0 ? size : 300;
    crop = crop ? 1 : false;

    return this.url(image, resizeUrl) + '?size=' + size + '&crop=' + crop;

  }

}

export default new Image();
