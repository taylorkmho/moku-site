<template>
  <VisitationMapSVG />
</template>

<script>
  import VisitationMapSVG from './VisitationMapSVG.vue'

  export default {
    name: 'VisitationMap',
    components: {
      VisitationMapSVG
    },
    data() {
      return {}
    },
    mounted() {
      console.log('😭 visitationmap')
    },
    methods: {}
  }
</script>

<style scoped>
</style>
