<template>
  <div>
    <h2 class="collection-list-heading" v-if="featured && isReady">Featured</h2>
    <a v-if="featured && isReady" class="collection-featured-banner" :href="featured.href">
      <div class="collection-featured-banner__content">
        <h5>FEATURED</h5>
        <h3>{{featured.title}}</h3>
        <button class="button button--light">Explore Now</button>
      </div>
      <div
        v-if="featured.hasUploadedAsset"
        class="collection-featured-banner__image"
        :style="{backgroundImage: `url(${featured.assetUrl})`}"
      ></div>
    </a>
    <h2 class="collection-list-heading">Topics</h2>
    <div class="resources-list-container" v-if="isReady">
      <article
        class="resources-list"
        :id="collection.id"
        v-for="(collection, index) in collections"
      >
        <span class="resources-list__count-badge">{{collection.itemCount.niceValue}}</span>
        <div
          class="resources-list__header-image"
          :style="{backgroundImage: `url(${collection.coverImage})`}"
        >
          <img :src="collection.coverImage" alt>
        </div>
        <h3 class="resources-list__title">{{collection.title}}</h3>
        <ul class="resources-list__list">
          <li v-for="item in collection.items" class="resources-list-item" v-if="item.visible">
            <a data-item-id="id" :href="item.fullUrl" class="resources-list-item__link">
              <span v-html="item.title"></span>
              <div class="pills">
                <span class="pills__pill">{{item.type}}</span>
              </div>
            </a>
          </li>
        </ul>
        <button
          class="button button--small button--light"
          v-if="collection.loadMore"
          @click="loadMore(index)"
        >Show More</button>
      </article>
    </div>
    <div class="resources-list-container" v-else>
      <div class="collection-placeholder">
        <div class="collection-placeholder__child"></div>
      </div>
      <div class="collection-placeholder">
        <div class="collection-placeholder__child"></div>
      </div>
      <div class="collection-placeholder">
        <div class="collection-placeholder__child"></div>
      </div>
      <div></div>
      <div class="loading-spinner"></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapResourceType, getUrlParameter } from '../helpers'

const PAGINATION_COUNT = 5
const INDIGENOUS_MAP_URL = 'resources/indigenous-languages-around-the-world'

export default {
  props: {
    url: String,
  },
  data() {
    return {
      collections: [],
      count: {
        expected: undefined,
        successful: 0,
      },
      featured: undefined,
    }
  },
  computed: {
    isReady: function() {
      return this.count.successful === this.count.expected
    },
  },
  mounted: function() {
    this.fetchItems()
  },
  updated: function() {
    if (!this.isReady) return
    this.handleHighlight()
  },
  methods: {
    fetchItems: function() {
      axios.get(`${INDIGENOUS_MAP_URL}?format=json`).then(response => {
        this.featured = {
          title: response.data.collection.title,
          href: response.data.collection.fullUrl,
          hasUploadedAsset: !!response.data.collection.mainImage.filename,
          assetUrl: response.data.collection.mainImage.assetUrl,
        }
      })
      axios
        .get(`${this.url}?format=json`)
        .then(response => {
          if (response.data.collection.collections === undefined) return

          const collections = response.data.collection.collections

          this.count.expected = collections.length

          collections.forEach((collection, collectionIndex) => {
            axios
              .get(`${collection.fullUrl}?format=json`)
              .then(response => {
                if (response.data.items === undefined) return

                const collectionData = {
                  id: collection.id,
                  url: collection.fullUrl,
                  title: collection.title,
                  itemCount: {
                    value: collection.itemCount,
                    niceValue: `${collection.itemCount} RESOURCE${
                      collection.itemCount > 1 ? 'S' : ''
                    }`,
                  },
                  coverImage: response.data.collection.mainImage
                    ? response.data.collection.mainImage.assetUrl
                    : undefined,
                  items: response.data.items.map((item, itemIndex) => {
                    console.log(item)
                    return {
                      title: item.title,
                      fullUrl: item.fullUrl,
                      assetUrl: item.assetUrl,
                      hasUploadedAsset: !!item.filename,
                      type: mapResourceType(item.customContent.customType),
                      visible: itemIndex < 5,
                    }
                  }),
                }

                this.$set(this.collections, collectionIndex, collectionData)
                this.count.successful++

                return {
                  isPaginated: collectionData.items.length > 5,
                  collectionIndex: collectionIndex,
                }
              })
              .then(options => {
                if (!options.isPaginated) return

                const updatedItems = Object.assign(
                  this.collections[options.collectionIndex],
                  { loadMore: true }
                )
                this.$set(
                  this.collections,
                  options.collectionIndex,
                  updatedItems
                )
              })
          })
        })
        .catch(error => {
          throw error
        })
    },
    handleHighlight: function() {
      const el = document.getElementById(`${getUrlParameter('c')}`)
      if (el === null || el.classList.contains('resources-list--highlighted'))
        return

      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      el.classList.add('resources-list--highlighted')
    },
    loadMore: function(collectionIndex) {
      const match = this.collections[collectionIndex]

      const countOnUpdate = match.items.filter(item => {
        return item.visible
      }).length

      const items = match.items.map((item, itemIndex) => {
        return {
          ...item,
          visible: itemIndex < countOnUpdate + PAGINATION_COUNT,
        }
      })

      const countAfterUpdate = items.filter(item => {
        return item.visible
      }).length

      const updatedItems = Object.assign(this.collections[collectionIndex], {
        items: items,
        loadMore: countAfterUpdate < match.items.length,
      })

      this.$set(this.collections, collectionIndex, updatedItems)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/base.scss';
@import '../../styles/mixins.scss';

.loading-spinner {
  margin: 0 auto;
}
.collection-placeholder {
  padding: $d-padding-small;
}
.collection-placeholder__child {
  height: 0;
  padding-bottom: 56.25%;
  width: 100%;
  border-radius: $d-border-radius;
  background-color: $c-off-white;
}

.collection-featured-banner {
  position: relative;
  padding: $d-padding;
  display: block;
  margin: 0 $d-padding-small $d-space-large;

  &__content {
    @extend %antialiased;
    position: relative;
    z-index: 110;
    color: $c-off-white;
    h5 {
      margin: 0;
    }
    h3 {
      margin: $d-space 0 $d-space-large;
      font: 400 24px $f-serif;
      @include md {
        font-size: 32px;
      }
    }
  }

  &__image {
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center center;
    background-color: $c-blue;
    border-radius: $d-border-radius;
    overflow: hidden;
    filter: url(#blue-mono);
  }
}
</styled>
