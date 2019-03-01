<template>
  <div>
    <h2 class="collection-list-heading">Topics</h2>
    <div class="resources-list-container" v-if="isReady">
      <article class="resources-list" :id="collection.id" v-for="(collection, index) in collections">
        <span class="resources-list__count-badge">{{collection.itemCount.niceValue}}</span>
        <div class="resources-list__header-image" :style="{backgroundImage: `url(${collection.coverImage})`}">
          <img :src="collection.coverImage" alt="" />
        </div>
        <h3 class="resources-list__title">{{collection.title}}</h3>
        <ul class="resources-list__list">
          <li v-for="item in collection.items" class="resources-list-item">
            <a data-item-id="id" :href="item.fullUrl" class="resources-list-item__link">
              {{item.title}}
              <div class="pills">
                <span class="pills__pill">{{item.type}}</span>
              </div>
            </a>
          </li>
        </ul>
        <div class="loading-spinner" v-if="collection.loading"></div>
        <button
          class="button button--small button--light"
          v-if="collection.loadMore.show"
          @click="loadMore(collection.loadMore.url, index)"
        >
          Show More
        </button>
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
      }
    },
    computed: {
      isReady: function() {
        return this.count.successful === this.count.expected
      },
    },
    mounted: function() {
      this.fetchItems();
    },
    updated: function() {
      if (!this.isReady) return
      this.handleHighlight()
    },
    methods: {
      fetchItems: function() {
        axios.get(`${this.url}?format=json`)
          .then((response) => {
            if (response.data.collection.collections === undefined) return

            const collections = response.data.collection.collections

            this.count.expected = collections.length

            collections.forEach((collection, index) => {
              axios.get(`${collection.fullUrl}?format=json`)
                .then((response) => {
                  if (response.data.items === undefined) return

                  const collectionData = {
                    id: collection.id,
                    url: collection.fullUrl,
                    title: collection.title,
                    itemCount: {
                      value: collection.itemCount,
                      niceValue: `${collection.itemCount} RESOURCE${collection.itemCount > 1 ? 'S' : ''}`,
                    },
                    coverImage: response.data.collection.mainImage ? response.data.collection.mainImage.assetUrl : undefined,
                    items: response.data.items.map((item) => {
                      return {
                        title: item.title,
                        fullUrl: item.fullUrl,
                        assetUrl: item.assetUrl,
                        hasUploadedAsset: !!item.filename,
                        type: mapResourceType(item.customContent.customType),
                      }
                    }),
                    loadMore: {
                      show: response.data.pagination ? response.data.pagination.nextPage : false,
                      url: response.data.pagination ? response.data.pagination.nextPageUrl : undefined,
                    },
                    loading: false,
                  }

                  this.$set(this.collections, index, collectionData)
                  this.count.successful++
                })
            })
          })
          .catch((error) => {
            throw error;
          })
      },
      handleHighlight: function() {
        const el = document.getElementById(`${getUrlParameter('c')}`)
        if (el === null || el.classList.contains('resources-list--highlighted')) return

        el.scrollIntoView({behavior: 'smooth', block: 'start'})
        el.classList.add('resources-list--highlighted')
      },
      loadMore: function(url, index) {
        const match = this.collections[index]
        this.$set(match, 'loading', true)

        axios.get(`${url}&format=json`)
          .then((response) => {
            if (response.data.items === undefined) return

            const collectionItems = match.items

            // unset loading
            this.$set(match, 'loading', false)
            // update next url to fetch
            this.$set(match, 'loadMore', {
              show: response.data.pagination ? response.data.pagination.nextPage : false,
              url: response.data.pagination ? response.data.pagination.nextPageUrl : undefined,
            })

            const newItems = response.data.items
              .map((item) => {
                return {
                  title: item.title,
                  fullUrl: item.fullUrl,
                  assetUrl: item.assetUrl,
                  hasUploadedAsset: !!item.filename,
                  type: mapResourceType(item.customContent.customType),
                }
              })

            newItems.forEach((item) => {
                this.$set(collectionItems, collectionItems.length, item)
              })
          })
          .catch((error) => {
            throw error;
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/base.scss';

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
</styled>
