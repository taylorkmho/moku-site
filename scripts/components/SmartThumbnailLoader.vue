<template>
  <figure
    :style="style"
    :class="{
      'smart-thumbnail': true,
      'smart-thumbnail--has-tint': hasTint,
    }"
  ></figure>
</template>

<script>
  import axios from 'axios'
  import { getYoutubeId, getVideoSource } from '../helpers'

  export default {
    props: {
      href: String,
      hasTint: Boolean,
    },
    data() {
      return {
        isVideoRendered: false,
        thumbnail: "url(/assets/placeholder.png)",
      }
    },
    computed: {
      style: function() {
        return {
          backgroundImage: this.thumbnail
        }
      },
      videoSource: function() {
        return getVideoSource(this.href);
      }
    },
    mounted: function() {
      this.fetchThumbnail();
    },
    methods: {
      fetchThumbnail: function() {
        if (this.videoSource === "youtube") {
          this.thumbnail = `url(https://img.youtube.com/vi/${getYoutubeId(this.href)}/maxresdefault.jpg)`
        } else if (this.videoSource === "vimeo") {
          axios.get(`https://vimeo.com/api/oembed.json?url=${this.href}`)
            .then((response) => {
              const vimeoId = response.data.video_id

              axios.get(`https://vimeo.com/api/v2/video/${vimeoId}.json`)
                .then((response) => {
                  this.thumbnail = `url(${response.data[0].thumbnail_large})`
                })
                .catch((error) => {
                  throw error;
                })
            })
            .catch((error) => {
              throw error;
            })
        }
      },
    }
  }
</script>

<style>
.smart-thumbnail {
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;

  @media (min-width: 768px) {
    box-shadow: var(--d-box-shadow);
    border-radius: var(--d-border-radius);
  }

  &--has-tint {
    filter: url(#teal-mono);
  }
}
</style>
