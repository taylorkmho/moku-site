<template>
  <div>
    <h2 class="collection-list-heading">Topics</h2>
    <div class="resources">
      <article class="resource" v-for="category in categories">
        <div class="resource__image">
          <img :src="firstImage" alt="" />
        </div>
        <h3 class="resource__title">{{category.title}}</h3>
        <ul>
          <li v-for="item in category.items">
            <a data-item-id="id" :href="item.fullUrl">
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
          const categoryItems = this.items.filter((item) => item.category == category);

          return {
            title: category,
            items: categoryItems,
          }
        })
      },
      firstImage: function() {
        return this.items[0].assetUrl
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

<style scoped>
  .resources {
  }
</styled>
