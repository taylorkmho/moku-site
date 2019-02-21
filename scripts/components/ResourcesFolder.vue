<template>
  <div>
    <h2 class="collection-list-heading">Topics</h2>
    <div class="resources-list-container" v-if="isReady">
      <article class="resources-list" :id="category.id" v-for="category in orderedCategories">
        <span class="resources-list__count-badge">{{category.itemCount.niceValue}}</span>
        <div class="resources-list__header-image" :style="{backgroundImage: `url(${category.coverImage})`}">
          <img :src="category.coverImage" alt="" />
        </div>
        <h3 class="resources-list__title">{{category.title}}</h3>
        <ul class="resources-list__list">
          <li v-for="item in category.items" class="resources-list-item">
            <a data-item-id="id" :href="item.fullUrl" class="resources-list-item__link">
              {{item.title}}
              <div class="pills">
                <span class="pills__pill">{{item.type}}</span>
              </div>
            </a>
          </li>
        </ul>
        <div class="loading-spinner" v-if="category.loading"></div>
        <button class="button button--small button--light" v-if="category.loadMore.show" @click="loadMore(category.loadMore.url, category.title)">Show More</button>
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
        categories: [],
        count: {
          expected: undefined,
          successful: 0,
        },
      }
    },
    computed: {
      orderedCategories: function() {
        return this.categories
          .sort(function(a, b) {
            if (b.itemCount.value - a.itemCount.value !== 0) {
              return b.itemCount.value - a.itemCount.value
            }
            return a.title.localeCompare(b.title)
          });
      },
      isReady: function() {
        return this.count.successful === this.count.expected
      }
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
              .map((collection) => {
                return {
                  id: collection.id,
                  url: collection.fullUrl,
                  title: collection.title,
                  itemCount: {
                    value: collection.itemCount,
                    niceValue: `${collection.itemCount} RESOURCE${collection.itemCount > 1 ? 'S' : ''}`,
                  }
                }
              })

            this.count.expected = collections.length

            collections.forEach((category, index) => {
              axios.get(`${category.url}?format=json`)
                .then((response) => {
                  if (response.data.items === undefined) return

                  const items = response.data.items
                    .map((item) => {
                      return {
                        title: item.title,
                        fullUrl: item.fullUrl,
                        assetUrl: item.assetUrl,
                        hasUploadedAsset: !!item.filename,
                        type: mapResourceType(item.customContent.customType),
                      }
                    })

                  const categoryData = {
                    id: category.id,
                    title: category.title,
                    coverImage: response.data.collection.mainImage ? response.data.collection.mainImage.assetUrl : undefined,
                    items: items,
                    itemCount: category.itemCount,
                    loadMore: {
                      show: response.data.pagination ? response.data.pagination.nextPage : false,
                      url: response.data.pagination ? response.data.pagination.nextPageUrl : undefined,
                    },
                    loading: false,
                  }

                  this.$set(this.categories, this.categories.length, categoryData)
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
      loadMore: function(url, title) {
        const matchingCategory = this.categories.find(category => category.title === title)
        this.$set(matchingCategory, 'loading', true)

        axios.get(`${url}&format=json`)
          .then((response) => {
            if (response.data.items === undefined) return
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

            this.$set(matchingCategory, 'loading', false)
            this.$set(matchingCategory, 'loadMore', {
              show: response.data.pagination ? response.data.pagination.nextPage : false,
              url: response.data.pagination ? response.data.pagination.nextPageUrl : undefined,
            })
            newItems.forEach((item) => {
              this.$set(matchingCategory['items'], matchingCategory['items'].length, item)
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
  .loading-spinner {
    margin: 0 auto;
  }
  .collection-placeholder {
    padding: var(--d-padding-small);
  }
  .collection-placeholder__child {
    height: 0;
    padding-bottom: 56.25%;
    width: 100%;
    border-radius: var(--d-border-radius);
    background-color: $c-off-white;
  }
</styled>
