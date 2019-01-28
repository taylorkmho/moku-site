<template>
  <a href="#" v-html="label" v-bind:data-type="type" v-on:click.prevent="openModal" />
</template>

<script>
  export default {
    props: ['propInnerHTML', 'propType'],
    data() {
      return {
        label: this.propInnerHTML,
        type: this.propType
      }
    },
    methods: {
      openModal: function(event) {
        console.log(event)
      }
    }
  }
</script>
