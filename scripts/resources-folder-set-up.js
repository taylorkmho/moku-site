import Vue from 'vue'
import ResourcesFolder from './components/ResourcesFolder.vue'

export class resourcesFolderSetUp {
  constructor() {
    this.resourcesFolder = document.querySelector('[data-vue-resources-folder]')

    this.initVue()
  }

  initVue() {
    new Vue({
      el: this.resourcesFolder,
      render: function(createElement) {
        return createElement(ResourcesFolder, {
          props: {
            type: this.$el.dataset.type,
            url: this.$el.dataset.url,
          },
        })
      },
    })
  }
}
