<template>
  <div>
    <a href="#" v-html="label" v-bind:data-action="action" v-on:click.prevent="openModal"></a>
    <ModalLinkModal v-bind:is-modal-open="isModalOpen">
      😘 MODAL BOIZ
    </ModalLinkModal>
  </div>
</template>

<script>
  import ModalLinkModal from './ModalLinkModal.vue'

  export default {
    components: {
      ModalLinkModal
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
          console.log(`✨✨✨`)
          this.isModalOpen = true
        }
      }
    }
  }
</script>
