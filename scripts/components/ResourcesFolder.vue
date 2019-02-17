<template>
  <div>
    <h2 class="collection-list-heading">Topics</h2>
    <div class="resources-list-container">
      <article class="resources-list" v-for="category in orderedCategories">
        <div class="resources-list__header-image" :style="{backgroundImage: `url(${category.items[0].assetUrl})`}">
          <img :src="category.items[0].assetUrl" alt="" />
        </div>
        <h3 class="resources-list__title">{{category.title}}</h3>
        <ul class="resources-list__list">
          <li v-for="item in category.items" class="resources-list-item">
            <a data-item-id="id" :href="item.fullUrl" class="resources-list-item__link">
              {{item.title}}
            </a>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      url: String,
    },
    data() {
      return {
        categories: [],
      }
    },
    computed: {
      orderedCategories: function() {
        return this.categories
          .sort(function(a, b) {
            if( a.items.length < b.items.length ) { return 1 }
            if( a.items.length > b.items.length ) { return -1 }
            return 0
          });
      }
    },
    mounted: function() {
      this.fetchItems();
    },
    methods: {
      fetchItems: function() {
        axios.get(`${this.url}?format=json`)
          .then((response) => {
            const collections = response.data.collection.collections
              .map((collection) => {
                return {
                  url: collection.fullUrl,
                  title: collection.title,
                }
              })

            collections.forEach((collection) => {
              axios.get(`${collection.url}?format=json`)
                .then((response) => {
                  if (response.data.items === undefined) return

                  const items = response.data.items
                    .map((item) => {
                      return {
                        title: item.title,
                        fullUrl: item.fullUrl,
                        assetUrl: item.assetUrl,
                        hasUploadedAsset: !!item.filename,
                        category: item.customContent.category1,
                      }
                    })
                    this.categories.push({
                      title: collection.title,
                      items: items,
                    })
                })
            })
          })
          .catch((error) => {
            throw error;
          })
      }
    }
  }
</script>

<style scoped>
</styled>
