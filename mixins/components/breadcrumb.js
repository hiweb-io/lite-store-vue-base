export default {

  props: ['jsonapi'],

  data() {

    return {
      links: []
    };

  },

  created() {

    this.generateLinks();

  },

  methods: {

    generateLinks() {

      if (!this.jsonapi) {
        return;
      }

      // Generate links
      switch (this.jsonapi.document.data.type) {

        case 'products':
        this.generateProductLinks();
        break;

        case 'collections':
        this.generateCollectionLinks();
        break;

      }

    },

    async generateProductLinks() {

      let links = [{ text: 'Home', to: { name: 'home.index' }}];

      let collections = this.jsonapi.findRelationshipResources(this.jsonapi.document.data, 'collections');

      if (collections.length) {
        
        links.push({
          text: collections[0].attributes.title,
          to: { name: 'collection.detail', params: { slug: collections[0].attributes.slug } }
        });

      }

      links.push({
        text: this.jsonapi.document.data.attributes.title
      });

      return this.links = links;

    },

    generateCollectionLinks() {

    }

  },

  watch: {

    jsonapi: function() {
      this.generateLinks();
    }

  }

}