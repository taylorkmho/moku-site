import Vue from 'vue'
import CategoriesList from './components/CategoriesList.vue'

export class categoriesListSetUp {
  constructor() {
    this.categoriesList = document.querySelector('[data-vue-categories-list]')

    this.initVue()
  }

  initVue() {
    if (this.categoriesList === undefined) return

    new Vue({
      el: this.categoriesList,
      render: function(createElement) {
        return createElement(CategoriesList, {
          props: {
            collection: {
              title: this.$el.dataset.collectionTitle,
              url: this.$el.dataset.collectionUrl,
            },
          },
        })
      },
    })
  }
}
