<template>
  <nav class="about-nav">
    <div class="layout-container">
      <ul class="about-nav__list">
        <li class="about-nav__item" v-for="(link, linkIndex) in links" v-bind:key="link.id">
          <a
            :class="{'about-nav__link': true, 'about-nav__link--active': link.active}"
            @click="handleNavClick($event, linkIndex)"
            :href="link.anchor"
          >{{link.title}}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
require('waypoints/lib/noframework.waypoints.min')
const MEDIUM_MEDIA_QUERY = '(min-width: 768px)'
const RESIZE_DELAY = 250

export default {
  props: {},
  data() {
    return {
      showMenu: false,
      isScrolling: false,
      links: [
        {
          active: false,
          anchor: '#summary',
          id: 'summary',
          title: 'Summary',
        },
        {
          active: false,
          anchor: '#unesco-partner',
          id: 'unesco-partner',
          title: 'A UNESCO Partner',
        },
        {
          active: false,
          anchor: '#our-inoa',
          id: 'our-inoa',
          title: 'Our Inoa',
        },
        {
          active: false,
          anchor: '#our-ohana',
          id: 'our-ohana',
          title: 'Our ʻOhana',
        },
      ],
    }
  },
  mounted: function() {
    const anchors = [...document.querySelectorAll('.about-anchor')]
    anchors.forEach(anchorEl => {
      new Waypoint({
        element: anchorEl,
        handler: direction => {
          this.addWaypointListener(anchorEl.id, direction)
        },
        offset: 10,
      })
    })

    // this.initCheckUrlHash()

    this.updateViewportSize()
    window.addEventListener('resize', this.updateViewportSize)
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.updateViewportSize)
  },
  methods: {
    addWaypointListener: function(name, direction) {
      if (this.isScrolling) return

      this.removeAllActive()

      const indexByName = this.links.findIndex(x => x.id === name)
      if (direction === 'down') {
        this.setActiveTo(indexByName)
      } else if (direction === 'up') {
        if (indexByName === 0) return
        this.setActiveTo(indexByName - 1)
      }
    },
    // initCheckUrlHash: function() {
    //   if (!window.location.hash) return
    //   const hashStr = window.location.hash.substring(1)
    //   const indexByHash = this.links.findIndex(x => x.id === hashStr)

    //   this.setActiveTo(indexByHash)
    // },
    handleNavClick: function(event, selectedLinkIndex) {
      this.isScrolling = true
      setTimeout(() => {
        this.isScrolling = false
      }, 150)
      this.removeAllActive()
      this.setActiveTo(selectedLinkIndex)
    },
    removeAllActive: function() {
      this.links.forEach((link, linkIndex) => {
        this.links[linkIndex].active = false
      })
    },
    setActiveTo: function(index) {
      this.links[index].active = true
    },
    updateViewportSize() {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this.showMenu = window.matchMedia(MEDIUM_MEDIA_QUERY).matches
      }, RESIZE_DELAY)
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/base.scss';
@import '../../styles/mixins.scss';

.about-nav {
  background: #fff;
  text-align: center;
  line-height: 1;

  @include md {
    position: sticky;
    top: -1px;
    z-index: 500;
  }

  &__list {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__list {
    @extend %clear-list;
    border-top: 1px solid $c-very-light-gray;
    border-bottom: 1px solid $c-very-light-gray;
    padding-top: $d-padding-xsmall;
    padding-bottom: $d-padding-xsmall;
    @include md {
      padding-top: $d-padding-small;
      padding-bottom: $d-padding-small;
    }
  }
  &__item {
    margin-right: $d-space;
    @include sm-max {
      font-size: 11px;
    }
    @include md-max {
      margin-right: $d-space-xsmall;
      font-size: 12px;
    }
    &:last-of-type {
      margin-right: 00;
    }
  }
  &__link {
    color: $c-default;
    padding: $d-padding-xsmall;
    background-color: rgba($c-teal, 0);
    border-radius: $d-border-radius;
    transition: all ease-out 150ms;

    @include md {
      padding-left: $d-padding-small;
      padding-right: $d-padding-small;

      &--active,
      &:hover {
        background-color: rgba($c-teal, 0.125);
        color: $c-teal;
      }
      &--active {
        font-weight: 600;
      }
    }
  }
}
.about-anchor {
  display: block;
  position: relative;
  visibility: hidden;
  @include md {
    top: -58px; /* height of nav */
  }
}
</style>
