<template>
  <div>
    <div class="links-header links-header--small">
      <h3 class="links-header__subheading">More Videos On the Topic of</h3>
      <h2 class="links-header__title">{{this.collection.title}}</h2>
    </div>
    <div class="video-links" v-if="loaded">
      <a class="video-link" :href="item.url" v-for="item in items">
        <div class="video-link__thumbnail-container" :href="item.url">
          <img v-if="item.hasUploadedAsset" :src="item.assetUrl" alt="" />
          <SmartThumbnailLoader v-if="!item.hasUploadedAsset" :href="item.videoHref" alt="" />
        </div>
        <h4 class="video-link__title">{{item.title}}</h4>
        <span class="video-link__timestamp" v-if="item.runtime">{{item.runtime}}</span>
      </a>
    </div>
    <div class="video-links" v-else>
      <div class="video-placeholder"></div>
      <div class="video-placeholder"></div>
      <div class="video-placeholder"></div>
      <div class="video-placeholder"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import SmartThumbnailLoader from './SmartThumbnailLoader.vue'

  const RESOURCES_URL = '/resources?format=json'
  const VIDEO_TYPE = 'resource-video'

  export default {
    props: {
      id: String,
      title: String,
      type: String,
      collection: Object,
    },
    components: {
      SmartThumbnailLoader
    },
    data() {
      return {
        items: [],
        loaded: false,
      }
    },
    computed: {},
    mounted: function() {
      this.fetchSimilar()
    },
    methods: {
      fetchSimilar: function() {
        axios.get(`${this.collection.url}?format=json-pretty`)
          .then((response) => {
            this.loaded = true
            console.log(response.data.items)

            const matchedItems = response.data.items
              .filter((item) => item.customContent.customType === VIDEO_TYPE)
              .map((item) => {
                return {
                  assetUrl: item.assetUrl,
                  hasUploadedAsset: !!item.filename,
                  id: item.id,
                  runtime: item.customContent.runtime,
                  title: item.title,
                  url: item.fullUrl,
                  videoHref: item.customContent.video,
                }
              })

            const thisItem = matchedItems
              .filter((item, index) => {
                return item.id === this.id
              })[0]

            const indexMatch = matchedItems.indexOf(thisItem)

            const beforeItem = matchedItems
              .filter((item, index) => index < indexMatch)

            const afterItem = matchedItems
              .filter((item, index) => index > indexMatch)

            this.items = [...afterItem, ...beforeItem]
          })
          .catch((error) => {
            throw error;
          })
      },
    }
  }
</script>

<style scoped>
.aside-links {

}
</style>
