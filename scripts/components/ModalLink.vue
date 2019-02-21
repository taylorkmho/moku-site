<template>
  <div class="modal-link">
    <button
      class="button"
      v-html="innerHTML"
      :data-action="action"
      @click.prevent="openModal"
    />
    <ModalLinkWrapper
      v-if="isModalVisible"
      @close-modal="onCloseModal"
      :action="action"
      :href="href"
      :warnOnClose="warnOnClose"
    />
  </div>
</template>

<script>
  import ModalLinkWrapper from './ModalLinkWrapper.vue'

  export default {
    components: {
      ModalLinkWrapper,
    },
    props: {
      innerHTML: String,
      action: String,
      href: String,
      warnOnClose: Boolean,
    },
    data() {
      return {
        isModalVisible: false,
      }
    },
    methods: {
      openModal: function() {
        if (!this.isModalVisible) {
          this.isModalVisible = true
        }
        document.body.style.overflow = 'hidden'
      },
      onCloseModal: function() {
        if (this.isModalVisible) {
          this.isModalVisible = false
        }
        document.body.style.overflow = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-link {
    display: inline-block;
  }
</styled>
