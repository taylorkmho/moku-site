<template>
  <iframe
    :src="source"
    class="video-iframe"
    frameborder="0"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
    allow="autoplay; fullscreen"
  ></iframe>
</template>


<script>
  export default {
    name: 'VideoIFrame',
    props: {
      href: {
        type: String,
        required: true,
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

<style lang="scss" scoped>
  .video-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
