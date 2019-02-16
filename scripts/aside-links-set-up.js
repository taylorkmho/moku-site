import Vue from 'vue'
import AsideLinks from './components/AsideLinks.vue'

export class asideLinksSetUp {
  constructor() {
    this.asideLinks = document.querySelector('[data-vue-aside-links]')

    this.initVue()
  }

  initVue() {
    new Vue({
      el: this.asideLinks,
      render: function(createElement) {
        return createElement(AsideLinks, {
          props: {
            category: this.$el.dataset.category,
            title: this.$el.dataset.title,
            type: this.$el.dataset.type,
          },
        })
      },
    })
  }
}
