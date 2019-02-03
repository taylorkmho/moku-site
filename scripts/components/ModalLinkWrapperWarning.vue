<template>
  <div class="modal-warning">
    <span class="modal-warning__message">
      <h3>Are you sure you want to close the Request Form?</h3>
      <p>You&rsquo;ll lose anything you&rsquo;ve entered so far.</p>
    </span>
    <div class="modal-warning__actions">
      <button autofocus class="button button--hollow" @click="onCloseWarning">Go Back</button>
      <button class="button" @click="onCloseModal">Close Anyway</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModalLinkWrapperWarning',
    methods: {
      onCloseModal: function() {
        this.$emit('close-modal')
      },
      onCloseWarning: function() {
        this.$emit('close-warning')
      }
    }
  }
</script>

<style scoped>
  .modal-warning {
    position: absolute;
    border-radius: var(--d-border-radius);
    background: #fff;
    color: var(--c-black);
    z-index: 120;
    white-space: normal;
    padding: var(--d-padding);
    box-shadow: var(--d-box-shadow);
    &__message {
      text-align: left;
      & > *:first-child {
        margin-top: 0;
      }
      & > *:last-child {
        margin-bottom: var(--d-space-unit);
      }
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--d-space-unit);
      > * {
        margin-right: var(--d-space-unit);
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
</style>
