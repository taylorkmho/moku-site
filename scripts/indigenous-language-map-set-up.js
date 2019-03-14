import Vue from 'vue'
import IndigenousLanguageMap from './components/IndigenousLanguageMap.vue'

export class indigenousLanguageMapSetUp {
  constructor() {
    this.map =
      document.querySelector('[data-vue-indigenous-language-map]') || undefined

    if (this.map === undefined) {
      return
    }

    this.initVue()
  }

  initVue() {
    new Vue({
      el: this.map,
      render: function(createElement) {
        return createElement(IndigenousLanguageMap, {
          props: { url: this.$el.dataset.url },
        })
      },
    })
  }
}
