<template>
  <div
    :class="{ 'modal-wrapper': true, 'modal-wrapper--open': isOpen }"
    :style="styleObject"
    @click="onCloseModal"
  >
    <slot>Loading</slot>
  </div>
</template>

<script>
  export default {
    props: ['isModalOpen'],
    props: {
      isModalOpen: {
        validator: function(value) {
          return typeof(value.isModalOpen === "boolean")
        }
      },
    },
    data() {
      return {
        label: '',
        styleObject: {},
      }
    },
    computed: {
      isOpen: function() {
        return this.isModalOpen
      },
    },
    mounted() {
      this.setPosition()
    },
    methods: {
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
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.75);
    z-index: 100;
    display: none;
    padding-left: var(--d-padding);
    padding-right: var(--d-padding);
    &--open {
      display: flex;
      align-items: center;
      justify-content: center;
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
