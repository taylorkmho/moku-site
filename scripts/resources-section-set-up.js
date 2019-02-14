import Vue from 'vue'
import ResourcesSection from './components/ResourcesSection.vue'

export class resourcesSectionSetUp {
  constructor() {
    this.resourcesSection = document.querySelector(
      '[data-vue-container="resources"]'
    )

    this.initVue()
  }

  initVue() {
    new Vue({
      el: this.resourcesSection,
      render: function(createElement) {
        return createElement(ResourcesSection, {
          props: {
            url: this.$el.dataset.url,
          },
        })
      },
    })
  }
}
