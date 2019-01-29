<template>
  <div
    :class="{ 'modal-wrapper': true, 'modal-wrapper--animated-in': animatedIn }"
    :style="styleObject"
    @click="onCloseModal"
  >
    <slot>Loading</slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        animatedIn: false,
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
      onCloseModal: function() {
        this.$emit('close-modal')
      },
      setPosition: function() {
        const boundingClientRect = this.$el.getBoundingClientRect()
        this.$set(this.styleObject, 'top', `-${boundingClientRect.y}px`)
        this.$set(this.styleObject, 'left', `-${boundingClientRect.x}px`)
      }
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
    z-index: 100;
    padding-left: var(--d-padding);
    padding-right: var(--d-padding);
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      background-color: rgba(255, 255, 255, 0.8);
      opacity: 0;
      transition: opacity 300ms ease-out;
    }

    &--animated-in:after {
      opacity: 1;
    }

    @media (--small) {
      padding-left: calc(var(--d-padding) * 2);
      padding-right: calc(var(--d-padding) * 2);
    }

    @media (--large) {
      padding-left: calc(var(--d-padding) * 4);
      padding-right: calc(var(--d-padding) * 4);
    }
  }
</style>
