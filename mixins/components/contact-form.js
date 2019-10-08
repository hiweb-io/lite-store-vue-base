export default {

  props: ['title', 'hidePhone', 'successMessage'],


  data() {

    return {
      name: '',
      email: '',
      message: '',

      isSending: false,
      isSuccess: false,
      errors: [],

    };

  },

  methods: {

    send() {

      // Send contact request
      this.isSuccess = false;
      this.isSending = true;
      this.errors = [];

      this.$hiwebBase.api.post('contacts', {
        data: {
          type: 'contacts',
          attributes: {
            full_name: this.name,
            email: this.email,
            message: this.message
          }
        }
      }).then(response => {
        this.isSuccess = true;
        this.isSending = false;

        this.name = '';
        this.email = '';
        this.message = '';

      }).catch(error => {

        try {

          let errors = JSON.parse(error.responseText).errors;
          this.errors = errors;

        } catch (e) {

          this.errors.push({ title: 'Failed to send contact message' });

        };
  
        this.isSending = false;

      });

    }

  }

}