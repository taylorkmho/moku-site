<template>
  <div :class="{ 'modal': true, 'modal--open': isOpen }" :style="styleObject">
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
      setPosition: function() {
        const boundingClientRect = this.$el.getBoundingClientRect()
        this.$set(this.styleObject, 'top', `-${boundingClientRect.y}px`)
        this.$set(this.styleObject, 'left', `-${boundingClientRect.x}px`)
      }
    }
  }
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.75);
    z-index: 100;
    display: none;
  }
  .modal--open {
    display: block;
  }
</style>
