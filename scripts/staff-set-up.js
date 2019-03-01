import Vue from 'vue'
import Staff from './components/Staff.vue'

export class staffSetUp {
  constructor() {
    this.staffSection = document.querySelector('[data-vue-staff]')

    this.initVue()
  }

  initVue() {
    if (this.staffSection === null) return

    new Vue({
      el: this.staffSection,
      render: function(createElement) {
        return createElement(Staff, {
          props: {
            url: this.$el.dataset.url,
          },
        })
      },
    })
  }
}
