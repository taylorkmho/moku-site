import Vue from 'vue'
import ModalLink from './components/ModalLink.vue'
import { isTypeformHref, isVideoHref, stripString } from './helpers'

export class modalSetUp {
  constructor() {
    this.modalLinks = Array.prototype.slice
      .call(document.querySelectorAll('a'))
      .filter(link => link.target !== '_blank')
      .filter(link => isVideoHref(link.href) || isTypeformHref(link.href))
      .map(link => {
        const obj = {}
        obj.href = link.href
        obj.el = link
        if (isVideoHref(link.href)) {
          obj.action = 'video'
        } else if (isTypeformHref(link.href)) {
          obj.action = 'request-a-visit'
        }
        return obj
      })

    this.initVue()
  }

  initVue() {
    this.modalLinks.forEach(modalLink => {
      new Vue({
        el: modalLink.el,
        render: function(createElement) {
          return createElement(ModalLink, {
            props: {
              innerHTML: this.$el.innerHTML,
              action: modalLink.action,
              href: modalLink.href,
              warnOnClose: modalLink.action === 'request-a-visit',
            },
          })
        },
      })
    })
  }
}
