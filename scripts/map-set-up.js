import Vue from 'vue'
import VisitationMap from './components/VisitationMap.vue'

export class mapSetUp {
  constructor() {
    this.map = document.querySelector('#map')

    this.initVue()
  }

  initVue() {
    new Vue({
      el: this.map,
      render: function(createElement) {
        return createElement(VisitationMap)
      },
    })
  }
}
