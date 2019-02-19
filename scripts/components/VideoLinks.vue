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
        hasMoreToLoad: true,
        items: [],
        loaded: false,
        nextLoadUrl: undefined,
      }
    },
    computed: {
      loadUrl: function() {
        return this.nextLoadUrl ? `${this.nextLoadUrl}&format=json-pretty` : `${this.collection.url}?format=json-pretty`
      },
    },
    mounted: function() {
      this.fetchSimilar()
    },
    methods: {
      fetchSimilar: function() {
        if (!this.hasMoreToLoad) return

        axios.get(`${this.loadUrl}`)
          .then((response) => {
            if (response.data.items === undefined) return
            this.hasMoreToLoad = response.data.pagination.nextPage
            this.nextLoadUrl = response.data.pagination.nextPageUrl

            const videoItems = response.data.items
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

            videoItems.forEach((item) => {
              this.$set(this.items, this.items.length, item)
            })

          })
          .then(() => {
            if (this.hasMoreToLoad) {
              this.fetchSimilar()
            }
          })
          .then(() => {
            if (this.hasMoreToLoad) return
            this.loaded = true

            const thisItem = this.items
              .filter((item, index) => item.id === this.id)[0]

            const indexMatch = this.items.indexOf(thisItem)

            const beforeItem = this.items
              .filter((item, index) => index < indexMatch)

            const afterItem = this.items
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
