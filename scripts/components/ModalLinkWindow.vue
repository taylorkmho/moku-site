<template>
  <div class="modal-window">
    <ModalLinkWindowVideo
      v-if="action === 'video' && isOpen"
      :isModalOpen="isOpen"
      :source="source"
    />
    <h1 v-if="action === 'request-a-visit'">rav</h1>
  </div>
</template>

<script>
  import ModalLinkWindowVideo from './ModalLinkWindowVideo.vue'

  export default {
    name: 'ModalLinkWindow',
    components: {
      ModalLinkWindowVideo
    },
    props: ['isModalOpen', 'propAction', 'propHref'],
    data() {
      return {
        action: this.propAction,
        source: this.propHref,
      }
    },
    computed: {
      isOpen: function() {
        return this.isModalOpen
      }
    }
  }
</script>

<style scoped>
  .modal-window {
    width: 100%;
  }
</style>
