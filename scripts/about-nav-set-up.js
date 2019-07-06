import Vue from 'vue'
import AboutNav from './components/AboutNav.vue'

export class aboutNavSetUp {
  constructor() {
    this.aboutNav = document.querySelector('[data-vue-about-nav]')

    this.initVue()
  }

  initVue() {
    if (this.aboutNav === undefined) return

    new Vue({
      el: this.aboutNav,
      render: function (createElement) {
        return createElement(AboutNav)
      },
    })

  }
}
