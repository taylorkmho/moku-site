import Vue from 'vue'
import VideoLinks from './components/VideoLinks.vue'

export class videoLinksSetUp {
  constructor() {
    this.videoLinks = document.querySelector('[data-vue-video-links]')

    this.initVue()
  }

  initVue() {
    new Vue({
      el: this.videoLinks,
      render: function(createElement) {
        return createElement(VideoLinks, {
          props: {
            type: this.$el.dataset.type,
            category: this.$el.dataset.category,
            title: this.$el.dataset.title,
          },
        })
      },
    })
  }
}
