import Vue from 'vue'
import SmartThumbnailLoader from './components/SmartThumbnailLoader.vue'
import { isVideoHref, isValidImage } from './helpers'

export class smartThumbnailSetUp {
  constructor() {
    this.smartThumbnails = Array.prototype.slice
      .call(document.querySelectorAll('[data-vue-smart-thumbnail]'))
      .filter(thumbnail => isVideoHref(thumbnail.dataset.href))
      .filter(thumbnail => !isValidImage(thumbnail.dataset.defaultThumbnail))

    this.initVue()
  }

  initVue() {
    this.smartThumbnails.forEach(smartThumbnail => {
      new Vue({
        el: smartThumbnail,
        render: function(createElement) {
          return createElement(SmartThumbnailLoader, {
            props: {
              href: smartThumbnail.dataset.href,
            },
          })
        },
      })
    })
  }
}
