<template>
  <div
    :class="{
      'video-links': true,
    }"
  >
    <a class="video-link" :href="item.url" v-for="item in items">
      <div class="video-link__thumbnail-container" :href="item.url">
        <img v-if="item.hasUploadedAsset" :src="item.assetUrl" alt="" />
        <SmartThumbnailLoader v-if="!item.hasUploadedAsset" :href="item.videoHref" alt="" />
      </div>
      <h4 class="video-link__title">{{item.title}}</h4>
      <span class="video-link__timestamp" v-if="item.runtime">{{item.runtime}}</span>
    </a>
  </div>
</template>

<script>
  import axios from 'axios'
  import SmartThumbnailLoader from './SmartThumbnailLoader.vue'

  const RESOURCES_URL = '/resources?format=json'
  const VIDEO_TYPE = 'resource-video'
  const VIDEO_LIMIT = 4

  export default {
    props: {
      title: String,
      type: String,
      category: String,
    },
    components: {
      SmartThumbnailLoader
    },
    data() {
      return {
        items: [],
      }
    },
    computed: {},
    mounted: function() {
      this.fetchSimilar()
    },
    methods: {
      fetchSimilar: function() {
        axios.get(RESOURCES_URL)
          .then((response) => {
            this.items = response.data.items
              .filter((item) => item.customContent.customType === VIDEO_TYPE)
              .filter((item) => item.title !== this.title)
              .filter((item) => item.customContent.category1 === this.category)
              // .filter((item, index) => index < VIDEO_LIMIT)
              .sort((item1, item2) => {
                if( item1.customContent.category1 === this.category ) { return -1 }
                return 0
              })
              .map((item) => {
                return {
                  assetUrl: item.assetUrl,
                  hasUploadedAsset: !!item.filename,
                  title: item.title,
                  runtime: item.customContent.runtime,
                  videoHref: item.customContent.video,
                  url: item.fullUrl,
                }
              })
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
