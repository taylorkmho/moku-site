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
            id: this.$el.dataset.id,
            type: this.$el.dataset.type,
            collection: {
              title: this.$el.dataset.collectionTitle,
              url: this.$el.dataset.collectionUrl,
            },
            title: this.$el.dataset.title,
          },
        })
      },
    })
  }
}
