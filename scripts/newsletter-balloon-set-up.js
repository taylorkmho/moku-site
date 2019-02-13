import Vue from 'vue'
import MailchimpBalloon from './components/MailchimpBalloon.vue'
import {
  isMailchimpLink,
  isTypeformHref,
  isVideoHref,
  stripString,
} from './helpers'

export class newsletterBalloonSetUp {
  constructor() {
    this.modalBalloonLinks = Array.prototype.slice
      .call(document.querySelectorAll('a'))
      .filter(link => isMailchimpLink(link.href))

    this.initVue()
  }

  initVue() {
    this.modalBalloonLinks.forEach(modalBalloonLink => {
      new Vue({
        el: modalBalloonLink,
        render: function(createElement) {
          return createElement(MailchimpBalloon, {
            props: {
              href: modalBalloonLink.href,
              innerHTML: this.$el.innerHTML,
            },
          })
        },
      })
    })
  }
}
