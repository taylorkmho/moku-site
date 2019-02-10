<template>
  <div
    :class="{
      'modal-request-a-visit': true,
      'modal-request-a-visit--faded': faded,
    }"
  >
    <aside class="modal-request-a-visit__aside">
      <h1 class="modal-request-a-visit__heading">Visitation Program <em>Request From</em></h1>
      <p>E komo mai! We'd be glad to have you.</p>
      <p>There are just a fiew bits of information we'd need to get from you first. Once you get it over, we'll work to respond as soon as possible!</p>
    </aside>
    <section class="modal-request-a-visit__primary">
      <div class="modal-request-a-visit__form"></div>
    </section>
  </div>
</template>

<script>
  import * as typeformEmbed from '@typeform/embed'

  export default {
    name: 'ModalLinkWrapperRequest',
    props: {
      faded: {
        type: Boolean,
      },
    },
    data: function() {
      return {
        typeformId: 'typef_orm',
        url: 'https://mokuolahonua.typeform.com/to/KAQguS',
        typeformOptions: {
          hideHeaders: true,
          hideFooter: true,
          opacity: 0,
          onSubmit: this.onSubmit
        }
      }
    },
    mounted: function() {
      typeformEmbed.makeWidget(this.$root.$el.querySelector('.modal-request-a-visit__form'), this.url, this.typeformOptions)
    },
    methods: {
      onSubmit: function() {
        console.log('😪 onsubmitzksi')
      }
    }
  }
</script>

<style scoped>
  .modal-request-a-visit {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    min-height: 740px;
    display: grid;
    grid-gap: 0;
    grid-template-areas: 'aside primary';
    grid-template-columns: 1fr 2fr;
    border-radius: var(--d-border-radius);
    background: #fff;
    overflow: hidden;

    &--faded:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--c-off-white);
      opacity: 0.8;
    }

    &__aside {
      grid-template: aside;
      text-align: left;
      padding: var(--d-padding-large) var(--d-padding) var(--d-padding);
    }

    &__heading {
      color: var(--c-black);
      font: 500 28px var(--f-serif);
      margin-bottom: 0;
      margin-top: 0;
      em {
        color: var(--c-teal);
        font-style: inherit;
      }
    }

    &__primary {
      grid-template: primary;
      background: var(--c-off-white);
    }

    &__form {
      height: 100%;
      width: 100%;
    }
  }
</style>
