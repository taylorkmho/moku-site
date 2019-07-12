<template>
  <div class="aside-links">
    <div class="aside-links__group" v-if="matchedCollectionItems.length > 0">
      <div class="links-header">
        <h3 class="links-header__subheading">More On the Topic of</h3>
        <h2 class="links-header__title">{{collection.title}}</h2>
      </div>
      <ol class="aside-links__list">
        <li
          class="aside-links__item"
          v-for="(item, index) in matchedCollectionItems"
          v-bind:key="index"
        >
          <a class="aside-links__link" :href="item.url">
            <span v-html="item.title"/>
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
        <li class="aside-links__item" v-for="(item, index) in matchedTypeItems" v-bind:key="index">
          <a class="aside-links__link" :href="item.url" v-html="item.title"/>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapResourceType } from '../helpers'

const LOAD_LIMIT = 3

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
    },
  },
  mounted: function() {
    this.fetchSimilar()
  },
  methods: {
    fetchSimilar: function() {
      axios
        .get(`${this.collection.url}?format=json`)
        .then(response => {
          const items = response.data.items.filter(
            item => this.title !== item.title
          )

          this.matchedCollectionItems = items
            .filter((item, index) => {
              return index < LOAD_LIMIT
            })
            .map(item => {
              return {
                assetUrl: item.assetUrl,
                hasUploadedAsset: !!item.filename,
                title: item.title,
                url: item.fullUrl,
                type: mapResourceType(item.customContent.customType),
              }
            })
        })
        .catch(error => {
          throw error
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.aside-links {
}
</style>
