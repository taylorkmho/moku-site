<template>
  <div
    :class="{
      'aside-links': true,
    }"
  >
    <div class="aside-links__group" v-if="matchedCategoryItems.length > 0">
      <div class="links-header">
        <h3 class="links-header__subheading">On the Topic of</h3>
        <h2 class="links-header__title">{{category}}</h2>
      </div>
      <ol class="aside-links__list">
        <li class="aside-links__item" v-for="item in matchedCategoryItems">
          <a class="aside-links__link" :href="item.url">{{item.title}}</a>
        </li>
      </ol>
    </div>
    <div class="aside-links__group" v-if="matchedTypeItems.length > 0">
      <h3 class="aside-links__subheading">More {{typeFormatted}}</h3>
      <ol class="aside-links__list">
        <li class="aside-links__item" v-for="item in matchedTypeItems">
          <a class="aside-links__link" :href="item.url">{{item.title}}</a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapResourceType } from '../helpers'

  const RESOURCES_URL = '/resources?format=json'

  export default {
    props: {
      category: String,
      title: String,
      type: String,
    },
    data() {
      return {
        matchedCategoryItems: [],
        matchedTypeItems: [],
      }
    },
    computed: {
      typeFormatted: function() {
        return mapResourceType(this.type, true)
      }
    },
    mounted: function() {
      this.fetchSimilar()
    },
    methods: {
      fetchSimilar: function() {
        axios.get(RESOURCES_URL)
          .then((response) => {
            const items = response.data.items
              .filter((item) => this.title !== item.title)

            this.matchedCategoryItems = items
              .filter((item) => this.category === item.customContent.category1)
              .map((item) => {
                return {
                  assetUrl: item.assetUrl,
                  hasUploadedAsset: !!item.filename,
                  title: item.title,
                  url: item.fullUrl,
                }
              })
            this.matchedTypeItems = items
              .filter((item) => item.customContent.customType !== 'resource-video')
              .filter((item) => this.type === item.customContent.customType)
              .map((item) => {
                return {
                  assetUrl: item.assetUrl,
                  hasUploadedAsset: !!item.filename,
                  title: item.title,
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
