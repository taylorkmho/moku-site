<template>
  <a
    :class="classes"
    :href="href"
    v-html="innerHTML"
  ></a>
</template>

<script>
  const RESOURCES_URL = '/resources'

  export default {
    props: {
      collection: Object,
      classList: DOMTokenList,
      innerHTML: String,
    },
    computed: {
      classes: function() {
        return this.classList.value
      },
      href: function() {
        return `${RESOURCES_URL}?c=${this.collection.id}`
      }
    },
    mounted: function() {
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
.aside-links {

}
</style>
