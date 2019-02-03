<template>
  <div class="modal-video">
    <div class="modal-video__container">
      <iframe
        :src="source"
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
    computed: {
      source: function() {
        let source
        const isVimeo = this.href.match(/https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/)
        const isYoutube = this.href.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);

        if (isVimeo) {
          source = `https://player.vimeo.com/video/${isVimeo[2]}?color=64c3bf&byline=0&autoplay=1&muted=0`
        } else if (isYoutube) {
          source = `https://www.youtube.com/embed/${isYoutube[1]}?autoplay=1&modestbranding=1`
        }

        return source
      }
    }
  }
</script>

<style scoped>
  .modal-video {
    border-radius: var(--d-border-radius);
    background: #000;
    overflow: hidden;
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
