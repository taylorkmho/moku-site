import Vue from 'vue'
import SmartCategoryLink from './components/SmartCategoryLink.vue'

export class smartCategoryLinkSetUp {
  constructor() {
    this.smartCategoryLinks = document.querySelectorAll(
      '[data-vue-smart-category-link]'
    )

    this.initVue()
  }

  initVue() {
    this.smartCategoryLinks.forEach(smartCategoryLink => {
      new Vue({
        el: smartCategoryLink,
        render: function(createElement) {
          return createElement(SmartCategoryLink, {
            props: {
              collection: {
                id: this.$el.dataset.collectionId,
              },
              innerHTML: this.$el.innerHTML,
              classList: this.$el.classList,
            },
          })
        },
      })
    })
  }
}
