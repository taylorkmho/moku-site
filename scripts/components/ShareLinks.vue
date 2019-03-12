<template>
  <div :class="classes">
    <button @click="clickHandler('facebook')" class="share"><img src="/assets/icon-facebook.svg" alt="Share on Facebook" /></button>
    <button @click="clickHandler('linkedin')" class="share"><img src="/assets/icon-linked-in.svg" alt="Share on LinkedIn" /></button>
    <a :href="emailLink" class="share"><img src="/assets/icon-email.svg" alt="Email this article" /></a>
  </div>
</template>

<script>
  const WINDOW_NAME = 'share-popup'
  const WINDOW_SIZE = 'height=460, width=640'

  export default {
    props: {
      classList: DOMTokenList,
      title: String,
      url: String
    },
    computed: {
      classes: function() {
        return this.classList.value
      },
      emailLink: function() {
        return `mailto:?to=&body=${this.title}%0A${this.url},&subject=Mokuola%20Honua%20Link`
      },
      facebookLink: function() {
        return `https://www.facebook.com/sharer/sharer.php?u=${this.url}`
      },
      linkedInLink: function() {
        return `https://www.linkedin.com/shareArticle?mini=true&url=${this.url}`
      }
    },
    methods: {
      clickHandler: function(linkType) {
        let newWindow = null

        switch (linkType) {
          case 'facebook':
            newWindow = window.open(this.facebookLink, WINDOW_NAME, WINDOW_SIZE);
            if (window.focus) {newWindow.focus()}
            return false;
            break;
          case 'linkedin':
            newWindow = window.open(this.linkedInLink, WINDOW_NAME, WINDOW_SIZE);
            if (window.focus) {newWindow.focus()}
            return false;
            break;
          default:
            return;

        console.log(popupSource)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
.categories-list {

}
</style>
