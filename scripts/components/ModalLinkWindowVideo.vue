<template>
  <div class="modal-video" v-if="isOpen">
    <div class="modal-video__container">
      <iframe
        src="https://player.vimeo.com/video/218597363?color=64c3bf&byline=0&autoplay=1&muted=0"
        class="modal-video__video-player"
        frameborder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
        allow="autoplay; fullscreen"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalLinkWindowVideo',
    props: ['source', 'isModalOpen'],
    data() {
      return {
        source: this.source
      }
    },
    computed: {
      isOpen: function() {
        return this.isModalOpen
      },
    }
  }
</script>

<style scoped>
  .modal-video {
    border-radius: var(--d-border-radius);
    background: #000;
  }
  .modal-video__container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
  }
  .modal-video__video-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
