import Vue from 'vue'
import ResourcesMiniList from './components/ResourcesMiniList.vue'

export class resourcesMiniListSetUp {
  constructor() {
    this.resourcesMiniList = document.querySelector(
      '[data-vue-resources-mini-list]'
    )

    this.initVue()
  }

  initVue() {
    new Vue({
      el: this.resourcesMiniList,
      render: function(createElement) {
        return createElement(ResourcesMiniList)
      },
    })
  }
}
