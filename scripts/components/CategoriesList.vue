<template>
  <ul class="categories__list">
    <li class="categories__item" v-for="category in categories"><a class="categories__link" :href="category.url">{{category.title}}</a></li>
  </ul>
</template>

<script>
  import axios from 'axios'

  const RESOURCES_URL = '/resources'

  export default {
    props: {},
    data() {
      return {
        categories: [],
      }
    },
    mounted: function() {
      this.fetchCategories()
    },
    methods: {
      fetchCategories: function() {
        axios.get(`${RESOURCES_URL}?format=json`)
          .then((response) => {
            this.categories = response.data.collection.collections
              .map((category) => {
                console.log(`${RESOURCES_URL}?c=${category.id}`);
                return {
                  url: `${RESOURCES_URL}?c=${category.id}`,
                  title: category.title,
                }
              })
              .sort((a, b) => {
                if( a.title < b.title ) { return -1 }
                if( a.title > b.title ) { return 1 }
                return 0
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
.categories-list {

}
</style>
