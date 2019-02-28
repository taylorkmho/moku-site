<template>
  <div class="site-header" v-if="showMenu">
    <div class="site-header__container">
      <a class="site-header__logo" v-if="branding.url" :href="branding.url" v-html="branding.logo" />
      <button class="site-header__button" @click="toggleDropdown" />
    </div>
    <div v-if="showMenuDropdown" class="site-header__menu-items">
      <a v-for="item in navItems" :href="item.url">
        {{item.title}}
      </a>
    </div>
  </div>
  <header v-else class="header" v-html="defaultHeader" />
</template>

<script>
  const MEDIUM_MEDIA_QUERY = "(max-width: 767px)"
  const RESIZE_DELAY = 250

  export default {
    props: {
      defaultHeader: String,
    },
    data() {
      return {
        branding: {
          logo: undefined,
          url: undefined,
        },
        navItems: [],
        resizeTimer: false,
        showMenu: undefined,
        showMenuDropdown: false,
      }
    },
    mounted: function() {
      this.getBranding();
      this.getNavLinks();
      this.updateViewportSize();
      window.addEventListener('resize', this.updateViewportSize);
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.updateViewportSize)
    },
    methods: {
      getBranding: function() {
        const branding = this.$el.querySelector('[data-vue-site-header-branding]')
        if (branding === null) return

        this.branding = {
          logo: branding.innerHTML,
          url: branding.href,
        }
      },
      getNavLinks: function() {
        const links = this.$el.querySelectorAll('[data-vue-site-header-nav] a')
        if (links === undefined) return

        this.navItems = Array.prototype.slice
          .call(links)
          .map((item) => {
            return {
              title: item.innerText,
              url: item.href,
            }
          })
      },
      toggleDropdown() {
        this.showMenuDropdown = !this.showMenuDropdown;
      },
      updateViewportSize() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.showMenu = window.matchMedia( MEDIUM_MEDIA_QUERY ).matches;
        }, RESIZE_DELAY);
      }
    }
  }
</script>

<style lang="scss">
  @import '../../styles/base.scss';
  @import '../../styles/mixins.scss';

  .header {
    @include md-max {
      opacity: 0.25;
    }
  }

  .site-header {
    position: relative;
    background-color: #fff;
    border-bottom: 2px solid $c-very-light-gray;

    &__container {
      display: flex;
      padding: $d-padding-xsmall $d-padding-small;
      justify-content: space-between;
    }

    &__logo {
      img {
        height: 40px;
      }
    }

    &__button {
      background: transparent;
      border: 0;
      width: 40px;
      padding: 0 $d-padding-xsmall;
      outline: none;
      border-radius: $d-border-radius-small;
      &:before {
        content: "";
        display: block;
        border-top: 2px solid $c-teal;
        padding-bottom: 7px;
        border-bottom: 2px solid $c-teal;
      }
      &:after {
        content: "";
        display: block;
        padding-bottom: 7px;
        border-bottom: 2px solid $c-teal;
      }
      &:hover,
      &:focus {
        background: rgba($c-teal, 0.125);
      }
      &:active {
        background: rgba($c-teal, 0.25);
        box-shadow: 0 0 0 2px rgba($c-teal, 0.5);
      }
    }

    &__menu-items {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1000;
      transform: translateY(100%);
      background: $c-off-white;
      padding: $d-padding-small;
      text-align: right;
      background-image: url('/assets/bg-pattern.png');
      h4 {
        margin: 0 0 $d-space-small;
      }
      a {
        display: inline-block;
        color: inherit;
        padding: $d-padding-xsmall 0;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        font-size: 14px;
        margin: 0 0 0 $d-space;
      }
    }
  }

</styled>
