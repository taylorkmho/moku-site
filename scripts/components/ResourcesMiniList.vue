<template>
  <section class="featured-resources__collection" v-if="isReady">
    <a :href="category.item.fullUrl" class="featured-resource" v-for="category in orderedCategories">
      <div class="featured-resource__image">
        <img :src="category.item.hasUploadedAsset ? category.item.assetUrl : '/assets/thumbnail-placeholder.png'" alt="" />
      </div>
      <h4 class="featured-resource__category">{{category.title}}</h4>
      <h2 class="featured-resource__title">{{category.item.title}}</h2>
      <p class="featured-resource__excerpt">{{category.item.body}}</p>
    </a>
  </section>
  <section class="featured-resources__collection" v-else>
    <div class="featured-resource featured-resource--placeholder" v-for="n in count.expected">
      <div class="featured-resource__image"></div>
      <h4 class="featured-resource__category"></h4>
      <h2 class="featured-resource__title"></h2>
      <p class="featured-resource__excerpt"></p>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import { shorten, stripHTML } from '../helpers'

  const RESOURCES_URL = '/resources'

  export default {
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
          .sort((a, b) => a.title.localeCompare(b.title));
      },
      isReady: function() {
        return this.count.successful === this.count.expected
      }
    },
    mounted: function() {
      this.fetchItems();
    },
    methods: {
      fetchItems: function() {
        axios.get(`${RESOURCES_URL}?format=json`)
          .then((response) => {
            if (response.data.collection.collections === undefined) return

            const collections = response.data.collection.collections
              .map((collection) => {
                return {
                  url: collection.fullUrl,
                  title: collection.title,
                }
              })

            this.count.expected = collections.length

            collections.forEach((category, index) => {
              axios.get(`${category.url}?format=json`)
                .then((response) => {
                  if (response.data.items === undefined) return

                  const item = response.data.items
                    .map((item) => {
                      return {
                        title: item.title,
                        fullUrl: item.fullUrl,
                        assetUrl: item.assetUrl,
                        hasUploadedAsset: !!item.filename,
                        body: shorten(stripHTML(item.excerpt ? item.excerpt : item.body), 150) + '...'
                      }
                    })[0]

                  const categoryData = {
                    title: category.title,
                    item: item,
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
    }
  }
</script>

<style lang="scss" scoped>
  .featured-resource--placeholder {
    .featured-resource__category {
      height: 14px;
      width: 80%;
      background: $c-very-light-gray;
    }
    .featured-resource__title {
      height: 20px;
      width: 100%;
      background: $c-very-light-gray;
    }
    .featured-resource__excerpt {
      height: 14px;
      width: 100%;
      background: $c-very-light-gray;
    }
  }
</styled>
