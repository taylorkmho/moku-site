<template>
  <div>
    <h2 class="collection-list-heading">Topics</h2>
    <div class="resources-list-container">
      <article class="resources-list" v-for="category in categories">
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
        items: [],
      }
    },
    computed: {
      categories: function() {
        const categories = this.items.map((item) => item.category);
        const filteredCategories = categories.filter((item, index) => categories.indexOf(item) >= index);

        return filteredCategories.map((category) => {
          const categoryItems = this.items
            .filter((item) => item.category == category)
            .sort(function(a, b) {
              if( a.title < b.title ) { return -1 }
              if( a.title > b.title ) { return 1 }
              return 0
            });

          return {
            title: category,
            items: categoryItems,
          }
        })
      },
    },
    mounted: function() {
      this.fetchItems();
    },
    methods: {
      fetchItems: function() {
        axios.get(`${this.url}?format=json`)
          .then((response) => {
            this.items = response.data.items
              .map((item) => {
                return {
                  title: item.title,
                  fullUrl: item.fullUrl,
                  assetUrl: item.assetUrl,
                  hasUploadedAsset: !!item.filename,
                  category: item.customContent.category1,
                }
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
</styled>
