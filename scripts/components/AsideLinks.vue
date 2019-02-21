<template>
  <div class="aside-links">
    <div class="aside-links__group" v-if="matchedCollectionItems.length > 0">
      <div class="links-header">
        <h3 class="links-header__subheading">More On the Topic of</h3>
        <h2 class="links-header__title">{{collection.title}}</h2>
      </div>
      <ol class="aside-links__list">
        <li class="aside-links__item" v-for="item in matchedCollectionItems">
          <a class="aside-links__link" :href="item.url">
            {{item.title}}
            <div class="pills">
              <span class="pills__pill">{{item.type}}</span>
            </div>
          </a>
        </li>
      </ol>
    </div>
    <div class="aside-links__group" v-if="matchedTypeItems.length > 0">
      <div class="links-header">
        <h3 class="links-header__subheading">More {{typeFormatted}}</h3>
      </div>
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

  export default {
    props: {
      collection: Object,
      title: String,
      type: String,
    },
    data() {
      return {
        matchedCollectionItems: [],
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
        axios.get(`${this.collection.url}?format=json`)
          .then((response) => {
            const items = response.data.items
              .filter((item) => this.title !== item.title)

            this.matchedCollectionItems = items
              .map((item) => {
                return {
                  assetUrl: item.assetUrl,
                  hasUploadedAsset: !!item.filename,
                  title: item.title,
                  url: item.fullUrl,
                  type: mapResourceType(item.customContent.customType),
                }
              })

            // this.matchedTypeItems = items
            //   .filter((item) => this.type === item.customContent.customType)
            //   .map((item) => {
            //     return {
            //       assetUrl: item.assetUrl,
            //       hasUploadedAsset: !!item.filename,
            //       title: item.title,
            //       url: item.fullUrl,
            //       type: mapResourceType(item.customContent.customType),
            //     }
            //   })
          })
          .catch((error) => {
            throw error;
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
.aside-links {

}
</style>
