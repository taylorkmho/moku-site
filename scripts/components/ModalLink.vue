<template>
  <div class="modal-link">
    <button
      class="button"
      v-html="innerHTML"
      :data-action="action"
      @click.prevent="onOpenModal"
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
  const MEDIUM_MEDIA_QUERY = "(max-width: 767px)"
  const RESIZE_DELAY = 250

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
        disableModal: undefined,
        isModalVisible: false,
        resizeTimer: false,
      }
    },
    mounted: function() {
      this.updateViewportSize();
      window.addEventListener('resize', this.updateViewportSize);
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.updateViewportSize)
    },
    methods: {
      onOpenModal: function() {
        if (this.action === "video"  || !this.disableModal) {
          this.isModalVisible = true
          document.body.style.overflow = 'hidden'
          return
        }

        window.location.href = this.href;
      },
      onCloseModal: function() {
        this.isModalVisible = false
        document.body.style.overflow = ''
      },
      updateViewportSize: function() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.disableModal = window.matchMedia( MEDIUM_MEDIA_QUERY ).matches;
        }, RESIZE_DELAY);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-link {
    display: inline-block;
  }
</styled>
