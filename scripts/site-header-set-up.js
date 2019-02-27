import Vue from 'vue'
import SiteHeader from './components/SiteHeader.vue'

export class siteHeaderSetUp {
  constructor() {
    this.siteHeader = document.querySelector('[data-vue-site-header]')

    this.initVue()
  }

  initVue() {
    if (this.siteHeader === undefined) return

    new Vue({
      el: this.siteHeader,
      render: function(createElement) {
        return createElement(SiteHeader, {
          props: {
            innerHTML: this.$el.innerHTML,
          },
        })
      },
    })
  }
}
