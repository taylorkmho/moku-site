<template>
  <use :x="x" :y="y" xlink:href="#visitation-map__marker" />
</template>

<script>
  export default {
    name: 'VisitationMapMarker',
    props: ['x', 'y'],
    components: {},
    mounted() {
      console.log('😬 visitation map marker');
    },
    methods: {}
  }
</script>

<style scoped>
</style>
