<template>
  <div class="modal-request-a-visit">
    <aside class="modal-request-a-visit__aside">
      <h1 class="modal-request-a-visit__heading">Visitation Program <em>Request From</em></h1>
      <p>E komo mai! We'd be glad to have you.</p>
      <p>There are just a fiew bits of information we'd need to get from you first. Once you get it over, we'll work to respond as soon as possible!</p>
    </aside>
    <section class="modal-request-a-visit__primary">
      iframe content
    </section>
  </div>
</template>

<script>
  export default {
    name: 'ModalLinkWindowRequest'
  }
</script>

<style scoped>
  .modal-request-a-visit {
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
    &__aside {
      grid-template: aside;
      text-align: left;
      padding: calc(var(--d-padding) * 3) var(--d-padding) var(--d-padding);
    }
    &__heading {
      color: var(--c-black);
      font: 500 28px var(--f-serif);
      margin-bottom: 0;
      margin-top: 0;
      em {
        color: var(--c-medium-gray);
        font-style: inherit;
      }
    }
    &__primary {
      grid-template: primary;
      background: #abda55;
    }
  }
</style>
