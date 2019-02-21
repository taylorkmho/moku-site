<template>
  <div
    :class="{
      'inline-player': true,
      'inline-player--video-playing': isVideoRendered,
      'inline-player--animating-out': isAnimatingOut,
    }"
  >
    <button class="play-button inline-player__button" v-if="!isVideoRendered" @click.prevent="openVideo">
      <img class="play-button__icon" src="/assets/icon-play.svg" alt="Play" />
      <p class="play-button__cta">Watch the Video</p>
    </button>
    <VideoIFrame v-if="isVideoRendered" :href="href" />
  </div>
</template>

<script>
  import VideoIFrame from './common/VideoIFrame.vue'

  export default {
    components: {
      VideoIFrame,
    },
    props: {
      href: String,
    },
    data() {
      return {
        isVideoRendered: false,
        isAnimatingOut: false,
      }
    },
    mounted: function() {
    },
    methods: {
      openVideo: function() {
        this.isAnimatingOut = true
        setTimeout(()=>{
          this.isVideoRendered = true
        }, 250)
      },
    }
  }
</script>

<style lang="scss" scoped>
.inline-player {
  &__button {
    transition: opacity 150ms ease-out;
  }

  &--animating-out {
    .inline-player__button {
      opacity: 0.5;
    }
  }

  &--video-playing {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $c-black;
  }
}
</style>
