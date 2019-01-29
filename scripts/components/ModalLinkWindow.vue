<template>
  <div :class="{ 'modal-window': true, 'modal-window--animated-in': animatedIn }">
    <ModalLinkWindowVideo
      v-if="action === 'video'"
      :propHref="href"
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
    props: ['propAction', 'propHref'],
    data() {
      return {
        action: this.propAction,
        animatedIn: false,
        href: this.propHref,
      }
    },
    mounted() {
      this.onAnimateIn()
    },
    methods: {
      onAnimateIn: function() {
        setTimeout(() => {
          this.animatedIn = true
        }, 10)
      },
    }
  }
</script>

<style scoped>
  .modal-window {
    width: 100%;
    z-index: 110;
    transform: translateY(3rem);
    opacity: 0;
    transition: all 300ms ease-out 150ms;
    &--animated-in {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
