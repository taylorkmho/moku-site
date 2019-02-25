<template>
  <div
    class="mailchimp-balloon-wrapper"
  >
    <button
      class="button"
      v-html="innerHTML"
      @click.prevent="handleClick"
    />
    <div
      :class="{
        'mailchimp-balloon': true,
        'mailchimp-balloon--open': isBalloonVisible,
      }"
    >
      <header class="mailchimp-balloon__header">
        <img src="/assets/graphic-envelope.png" />
        <h2>What&rsquo;s your email?</h2>
        <p>Enter it here to sign up to the Mokuola Honua newsletter.</p>
      </header>
      <form @submit="onSubmit" class="mailchimp-balloon__form" action="https://taylorkmho.us20.list-manage.com/subscribe/post?u=51c28ecf88357bd5504961c86&amp;id=cf8f7fba7a" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" novalidate>
        <input ref="emailInput" v-on:keyup="handleKeyUp" type="email" value="" name="EMAIL" required>
        <div style="position: absolute; left: -5000px;" aria-hidden="true">
          <input type="text" name="b_51c28ecf88357bd5504961c86_cf8f7fba7a" tabindex="-1" value="">
        </div>
        <button
          type="submit"
          name="subscribe"
          :class="{
            'button': true,
            'button--small': true,
            'button--disabled': !isEmailValid,
          }"
        >Subscribe</button>
      </form>
    </div>
  </div>
</template>

<script>
  import { isValidEmail } from '../helpers'

  export default {
    name: 'MailchimpBalloon',
    props: {
      innerHTML: String,
      href: String,
    },
    data: function() {
      return {
        isBalloonVisible: false,
        emailInputted: '',
        isEmailValid: false,
      }
    },
    methods: {
      handleClick: function() {
        this.toggleVisiblity()

        if (this.isBalloonVisible) {
          setTimeout(()=>{
            this.$refs.emailInput.focus()
          }, 10)
        }
      },
      handleKeyUp: function(e) {
        this.emailInputted = e.target.value
        this.isEmailValid = isValidEmail(this.emailInputted)
      },
      onSubmit: function(e) {
        if (!this.isEmailValid) {
          e.preventDefault()
        }
      },
      toggleVisiblity: function() {
        this.isBalloonVisible = !this.isBalloonVisible
      },
    }
  }
</script>

<style lang="scss">
@import '../../styles/base.scss';

.mailchimp-balloon-wrapper {
  position: relative;
  z-index: 300;
}

.mailchimp-balloon {
  display: none;
  position: absolute;
  top: -20px;
  left: #{'~"calc(50% - 150px)"'};
  transform: #{'~"translateY(-100%)"'};
  width: 300px;
  padding: $d-padding;
  background-color: #fff;
  background-size: 100% 100px;
  background-repeat: no-repeat;
  border-radius: $d-border-radius;
  text-align: center;
  box-shadow: $d-box-shadow-angled-up;
  &:after {
    content: "";
    position: absolute;
    left: #{'~"calc(50% - 10px)"'};
    bottom: 0;
    transform: translateY(100%);
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #fff;
  }


  &--open {
    display: block;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 72px;
    }
    h2 {
      margin: $d-space-small 0;
      color: $c-medium-gray;
      font-size: 14px;
    }
    p {
      margin: 0;
      font-size: 12px;
      color: $c-medium-light-gray;
    }
  }
  &__form {
    input {
      width: 100%;
    }
    button {
      margin-top: $d-space-small;
      float: right;
    }
  }
}
</style>
