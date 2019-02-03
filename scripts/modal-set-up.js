import Vue from 'vue'
import ModalLink from './components/ModalLink.vue'

import {
  getModalAction,
  isModalHash,
  isVideoHref,
  stripString,
} from './helpers'

export class modalSetUp {
  constructor() {
    this.modalLinks = Array.prototype.slice
      .call(document.querySelectorAll('a'))
      .filter(link => isModalHash(link.href))
      .map(link => {
        const obj = {}
        obj.href = isVideoHref(link.href)
          ? stripString(link.href, '#modal')
          : undefined
        obj.action = isVideoHref(link.href)
          ? 'video'
          : getModalAction(link.href)
        obj.el = link
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
