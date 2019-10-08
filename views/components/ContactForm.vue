<template>
  <div class="hiweb-contact-form">
    <h3 class="hiweb-contact-form__heading">{{ title ? title : 'Contact us' }}</h3>

    <div class="hiweb-contact-form__form">

      <div class="hiweb-contact-form__form__input hiweb-contact-form__form__input--name">
        <input class="hiweb-contact-form__form__input__name" type="text" v-model="name" placeholder="Your name" />
      </div>

      <div class="hiweb-contact-form__form__input hiweb-contact-form__form__input--email">
        <input class="hiweb-contact-form__form__input__email" type="text" v-model="email" placeholder="Email" />
      </div>

      <div class="hiweb-contact-form__form__input hiweb-contact-form__form__input--message">
        <textarea class="hiweb-contact-form__form__input__message" v-model="message" placeholder="Your message"></textarea>
      </div>

      <div v-if="errors && errors.length" class="hiweb-contact-form__form__errors">
        <p v-for="error in errors" class="hiweb-contact-form__form__errors__error">
          {{ error.title }}
        </p>
      </div>

      <div v-if="isSuccess" class="hiweb-contact-form__form__success">
        <p class="hiweb-contact-form__form__success__message">{{ successMessage ? successMessage : 'Thank you for contacting us, we received your message and will get back to you shortly.' }}</p>
      </div>

      <div class="hiweb-contact-form__form__submit">
        <button class="hiweb-contact-form__form__submit__button" :disabled="isSending" @click="send">
          {{ isSending ? 'Sending' : 'Send message' }}
        </button>
      </div>

    </div>

  </div>
</template>

<script type="text/javascript">
import mixin from '../../mixins/components/contact-form';

export default {

  mixins: [mixin],


}
</script>
