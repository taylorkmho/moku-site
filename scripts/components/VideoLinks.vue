<template>
  <div>
    <div class="links-header links-header--small">
      <h3 class="links-header__subheading">More Videos On the Topic of</h3>
      <h2 class="links-header__title">{{this.collection.title}}</h2>
    </div>
    <div class="video-links" v-if="loaded">
      <div class="video-links__container">
        <a class="video-link" :href="item.url" v-for="(item, index) in items" v-bind:key="index">
          <div class="video-link__thumbnail-container" :href="item.url">
            <img v-if="item.hasUploadedAsset" :src="item.assetUrl" alt>
            <SmartThumbnailLoader v-if="!item.hasUploadedAsset" :href="item.videoHref" alt/>
            <span class="video-link__timestamp" v-if="item.runtime">{{item.runtime}}</span>
          </div>
          <h4 class="video-link__title" v-html="item.title"/>
        </a>
      </div>
    </div>
    <div class="video-links" v-else>
      <div class="video-links__container">
        <div class="video-placeholder"></div>
        <div class="video-placeholder"></div>
        <div class="video-placeholder"></div>
        <div class="video-placeholder"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SmartThumbnailLoader from './SmartThumbnailLoader.vue'

const VIDEO_TYPE = 'resource-video'
const MOBILE_VIEWPORT = 768
const MOBILE_VIDEO_WIDTH = 320

export default {
  props: {
    id: String,
    title: String,
    type: String,
    collection: Object,
  },
  components: {
    SmartThumbnailLoader,
  },
  data() {
    return {
      hasMoreToLoad: true,
      items: [],
      loaded: false,
      nextLoadUrl: undefined,
      videoStyle: undefined,
    }
  },
  computed: {
    loadUrl: function() {
      return this.nextLoadUrl
        ? `${this.nextLoadUrl}&format=json-pretty`
        : `${this.collection.url}?format=json-pretty`
    },
  },
  mounted: function() {
    this.fetchSimilar()
  },
  methods: {
    fetchSimilar: function() {
      if (!this.hasMoreToLoad) return

      axios
        .get(`${this.loadUrl}`)
        .then(response => {
          if (response.data.items === undefined) return
          this.hasMoreToLoad = response.data.pagination
            ? response.data.pagination.nextPage
            : false
          this.nextLoadUrl = response.data.pagination
            ? response.data.pagination.nextPageUrl
            : undefined

          const videoItems = response.data.items
            .filter(item => item.customContent.customType === VIDEO_TYPE)
            .map(item => {
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

          videoItems.forEach(item => {
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

          const thisItem = this.items.filter(
            (item, index) => item.id === this.id
          )[0]

          const indexMatch = this.items.indexOf(thisItem)

          const beforeItem = this.items.filter(
            (item, index) => index < indexMatch
          )

          const afterItem = this.items.filter(
            (item, index) => index > indexMatch
          )

          this.items = [...afterItem, ...beforeItem]
        })
        .catch(error => {
          throw error
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/base.scss';

.video-links {
}
.video-link,
.video-placeholder {
  width: 200px;
  margin-right: $d-space-small;
  &:last-of-type {
    margin-right: 0;
  }
  @media (min-width: 768px) {
    width: initial;
  }
}
</style>
