import Vue from 'vue'
import ModalLink from './ModalLink.vue'
import { isVideoHref } from '../helpers'

const MODAL_HASH = '#modal'

export class modalSetUp {
  constructor() {
    this.modalLinks = Array.prototype.slice
      .call(document.querySelectorAll('a'))
      .filter(link => link.href.endsWith(MODAL_HASH))
      .map(link => {
        const obj = {}
        obj.type = isVideoHref(link.href) ? 'video' : 'other'
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
              propInnerHTML: this.$el.innerHTML,
              propType: modalLink.type,
            },
          })
        },
      })
    })
  }
}
