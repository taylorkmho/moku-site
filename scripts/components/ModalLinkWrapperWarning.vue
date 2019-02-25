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

<style lang="scss" scoped>
  @import '../../styles/base.scss';

  .modal-warning {
    position: absolute;
    border-radius: $d-border-radius;
    background: #fff;
    color: $c-black;
    z-index: 920;
    white-space: normal;
    padding: $d-padding;
    box-shadow: $d-box-shadow;
    &__message {
      text-align: left;
      & > *:first-child {
        margin-top: 0;
      }
      & > *:last-child {
        margin-bottom: $d-space;
      }
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
      margin-top: $d-space;
      > * {
        margin-right: $d-space;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
</style>
