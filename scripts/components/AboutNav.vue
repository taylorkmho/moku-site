<template>
  <nav class="about-nav" v-if="showMenu">
    <div class="layout-container">
      <ul class="about-nav__list">
        <li class="about-nav__item" v-for="link, linkIndex in links">
          <a
            :class="{'about-nav__link': true, 'about-nav__link--active': link.active}"
            @click="navigate($event, linkIndex)"
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
          this.updateNav(anchorEl.id, direction)
        },
        offset: 10,
      })
    })
    this.updateViewportSize()
    window.addEventListener('resize', this.updateViewportSize)
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.updateViewportSize)
  },
  methods: {
    updateNav: function(name, direction) {
      const waypointIndex = this.links.findIndex(x => x.id === name)

      this.links.forEach((link, linkIndex) => {
        this.links[linkIndex].active = false
      })

      if (direction === 'down') {
        this.links[waypointIndex].active = true
      } else {
        if (waypointIndex === 0) return

        this.links[waypointIndex - 1].active = true
      }
    },
    navigate: function(event, linkIndex) {
      // this.links[linkIndex].active = true
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
  position: sticky;
  top: -1px;
  z-index: 500;
  // margin-bottom: $d-space-large;
  background: #fff;

  &__list {
    @extend %clear-list;
    display: flex;
    justify-content: center;
    border-top: 1px solid $c-very-light-gray;
    border-bottom: 1px solid $c-very-light-gray;
    padding-top: $d-padding-small;
    padding-bottom: $d-padding-small;
  }
  &__item {
    margin-right: $d-space;
    &:last-of-type {
      margin-right: 0;
    }
  }
  &__link {
    padding: $d-padding-xsmall $d-padding-small;
    background-color: rgba($c-teal, 0);
    color: $c-default;
    border-radius: $d-border-radius;
    transition: all ease-out 150ms;

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
.about-anchor {
  display: block;
  position: relative;
  top: -58px; /* height of nav */
  visibility: hidden;
}
</style>
