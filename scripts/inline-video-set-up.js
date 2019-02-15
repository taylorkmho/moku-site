import Vue from 'vue'
import InlinePlayer from './components/InlinePlayer.vue'
import { isVideoHref } from './helpers'

export class inlineVideoSetUp {
  constructor() {
    this.inlinePlayers = Array.prototype.slice
      .call(document.querySelectorAll('a'))
      .filter(link => link.dataset.vuePlayer === 'inline')
      .filter(link => isVideoHref(link.href))

    this.initVue()
  }

  initVue() {
    this.inlinePlayers.forEach(inlinePlayer => {
      new Vue({
        el: inlinePlayer,
        render: function(createElement) {
          return createElement(InlinePlayer, {
            props: { href: inlinePlayer.href },
          })
        },
      })
    })
  }
}
