import Vue from 'vue'
import ShareLinks from './components/ShareLinks.vue'

export class shareLinksSetUp {
  constructor() {
    this.shareLinks = document.querySelector('[data-vue-share-links]')

    this.initVue()
  }

  initVue() {
    if (this.shareLinks === undefined) return

    new Vue({
      el: this.shareLinks,
      render: function(createElement) {
        return createElement(ShareLinks, {
          props: {
            classList: this.$el.classList,
            title: this.$el.dataset.title,
            url: this.$el.dataset.url,
          },
        })
      },
    })
  }
}
