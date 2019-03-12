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
          <li v-for="item in collection.items" class="resources-list-item" v-if="item.visible">
            <a data-item-id="id" :href="item.fullUrl" class="resources-list-item__link">
              {{item.title}}
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

  const PAGINATION_COUNT = 5

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

            collections.forEach((collection, collectionIndex) => {
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
                    items: response.data.items.map((item, itemIndex) => {
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
                .then((options) => {
                  if (!options.isPaginated) return

                  const updatedItems = Object.assign(
                    this.collections[options.collectionIndex],
                    {loadMore: true}
                  );
                  this.$set(this.collections, options.collectionIndex, updatedItems)
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
      loadMore: function(collectionIndex) {
        const match = this.collections[collectionIndex]

        const countOnUpdate = match.items.filter((item) => {
          return item.visible
        }).length

        const items = match.items.map((item, itemIndex) => {
          return {
            ...item,
            visible: itemIndex < countOnUpdate + PAGINATION_COUNT
          }
        })

        const countAfterUpdate = items.filter((item) => {
          return item.visible
        }).length

        const updatedItems = Object.assign(
          this.collections[collectionIndex],
          {
            items: items,
            loadMore: countAfterUpdate < match.items.length,
          }
        );

        this.$set(this.collections, collectionIndex, updatedItems)
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
