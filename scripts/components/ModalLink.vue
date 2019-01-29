<template>
  <div class="modal-link">
    <button
      class="button"
      v-html="label"
      :data-action="action"
      @click.prevent="openModal"
    />
    <ModalLinkWrapper
      v-if="isModalOpen"
      @close-modal="onCloseModal"
    >
      <ModalLinkWindow
        :propAction="action"
        :propHref="href"
      />
    </ModalLinkWrapper>
  </div>
</template>

<script>
  import ModalLinkWrapper from './ModalLinkWrapper.vue'
  import ModalLinkWindow from './ModalLinkWindow.vue'

  export default {
    components: {
      ModalLinkWrapper,
      ModalLinkWindow
    },
    props: {
      propInnerHTML: String,
      propAction: String,
      propHref: String,
    },
    data() {
      return {
        label: this.propInnerHTML || undefined,
        action: this.propAction || undefined,
        href: this.propHref || undefined,
        isModalOpen: false,
      }
    },
    methods: {
      openModal: function() {
        if (!this.isModalOpen) {
          this.isModalOpen = true
        }
        document.body.style.overflow = 'hidden'
      },
      onCloseModal: function() {
        console.log('🤞🤞🤞')
        if (this.isModalOpen) {
          this.isModalOpen = false
        }
        document.body.style.overflow = ''
      }
    }
  }
</script>

<style scoped>
  .modal-link {
    display: inline-block;
  }
</styled>
