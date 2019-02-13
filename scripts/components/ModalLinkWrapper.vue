<template>
  <div
    :class="{
      'modal-wrapper': true,
      'modal-wrapper--animated-in': animatedIn,
    }"
    :style="styleObject"
  >
    <div
      class="modal-wrapper__backdrop"
      @click="onHandleClose"
    ></div>
    <ModalLinkWrapperWarning
      v-if="isWarningVisible"
      @close-modal="onHandleClose({force: true})"
      @close-warning="onHideWarning()"
    />
    <div
      :class="{
        'modal-wrapper__window': true,
        'modal-wrapper__window--animated-in': animatedIn,
      }"
    >
      <ModalLinkWrapperVideo
        v-if="action === 'video'"
        :href="href"
      />
      <ModalLinkWrapperRequest
        v-if="action === 'request-a-visit'"
        :faded="isWarningVisible"
      />
    </div>
  </div>
</template>

<script>
  import ModalLinkWrapperVideo from './ModalLinkWrapperVideo.vue'
  import ModalLinkWrapperRequest from './ModalLinkWrapperRequest.vue'
  import ModalLinkWrapperWarning from './ModalLinkWrapperWarning.vue'

  export default {
    components: {
      ModalLinkWrapperVideo,
      ModalLinkWrapperRequest,
      ModalLinkWrapperWarning
    },
    props: ['action', 'href', 'warnOnClose'],
    data() {
      return {
        animatedIn: false,
        isWarningVisible: false,
        label: '',
        styleObject: {},
      }
    },
    mounted() {
      this.setPosition()
      this.onAnimateIn()
    },
    methods: {
      onAnimateIn: function() {
        setTimeout(() => {
          this.animatedIn = true
        }, 10)
      },
      onHandleClose: function(options) {
        if (this.warnOnClose && !options.force) {
          this.onShowWarning()
        } else {
          this.$emit('close-modal')
        }
      },
      setPosition: function() {
        const boundingClientRect = this.$el.getBoundingClientRect()
        this.$set(this.styleObject, 'top', `-${boundingClientRect.y}px`)
        this.$set(this.styleObject, 'left', `-${boundingClientRect.x}px`)
      },
      onShowWarning: function() {
        this.isWarningVisible = true
      },
      onHideWarning: function() {
        this.isWarningVisible = false
      },
    }
  }
</script>

<style scoped>
  .modal-wrapper {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 900;
    padding-left: var(--d-padding);
    padding-right: var(--d-padding);

    &__backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 910;
      display: block;
      background-color: var(--c-modal-bg);
      opacity: 0;
      transition: opacity 300ms ease-out;
    }

    &--animated-in &__backdrop {
      opacity: 1;
    }

    @media (--small) {
      padding-left: var(--d-padding-large);
      padding-right: var(--d-padding-large);
    }

    @media (--large) {
      padding-left: var(--d-padding-xlarge);
      padding-right: var(--d-padding-xlarge);
    }

    &__window {
      position: relative;
      width: 100%;
      z-index: 910;
      transform: translateY(3rem);
      opacity: 0;
      transition: all 300ms ease-out 150ms;
      pointer-events: none;
      > * {
        pointer-events: initial;
      }
      &--animated-in {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
</style>
