<template>
  <div class="modal-video">
    <div class="modal-video__container">
      <VideoIFrame :href="href" />
    </div>
  </div>
</template>

<script>
  import VideoIFrame from './common/VideoIFrame.vue'

  export default {
    components: {
      VideoIFrame,
    },
    name: 'ModalLinkWrapperVideo',
    props: {
      href: {
        type: String,
        required: true,
      },
      faded: {
        type: Boolean,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/base.scss';

  .modal-video {
    border-radius: $d-border-radius;
    background: #000;
    overflow: hidden;
  }
  .modal-video__container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
  }
</style>
