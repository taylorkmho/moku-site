<template>
  <div class="staff-list-container">
    <div class="staff-list">
      <button
        :class="{
          'staff-list-item': true,
          'staff-list-item--active': member.active,
        }"
        @click.prevent="handleClick(member.body, index)"
        v-for="(member, index) in staff"
        :key="index"
        :style="itemStyle"
      >
        <div class="staff-list-item__image-wrapper">
          <img :src="member.assetUrl">
        </div>
        <h4 class="staff-list-item__name" v-html="member.title"></h4>
        <h5 class="staff-list-item__position" v-html="member.position"></h5>
      </button>
    </div>
    <div v-html="expandedCopy" class="staff-copy layout-container layout-container--slim"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { stripHTML } from '../helpers'

export default {
  props: {
    url: String,
  },
  data() {
    return {
      expandedCopy: '',
      isOpen: false,
      staff: [],
    }
  },
  computed: {
    itemStyle: function() {
      return {
        width: `calc(100% / ${this.staff.length} - 20px)`,
      }
    },
  },
  mounted: function() {
    this.fetchItems()
  },
  methods: {
    fetchItems: function() {
      axios
        .get(`${this.url}?format=json`)
        .then(response => {
          if (response.data.items === undefined) return

          this.loading = false

          response.data.items.forEach((member, index) => {
            const isFirst = index === 0
            this.staff.push({
              assetUrl: member.assetUrl,
              hasUploadedAsset: !!member.filename,
              title: member.title,
              body: member.body,
              position: member.customContent.position,
              active: isFirst ? true : false,
            })
            if (isFirst) {
              this.expandedCopy = member.body
            }
          })
        })
        .catch(error => {
          throw error
        })
    },
    handleClick: function(body, index) {
      this.staff.forEach((member, i) => {
        if (index === i) {
          this.$set(this.staff[i], 'active', true)
        } else {
          this.$set(this.staff[i], 'active', false)
        }
      })
      this.expandedCopy = this.staff[index].body
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/base.scss';
@import '../../styles/mixins.scss';

.staff-list-container {
  margin-bottom: $d-space-xxxlarge;
}

.staff-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: flex-start;
}

.staff-list-item {
  width: 196px;
  max-width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  font-size: 16px;
  text-align: left;
  margin: 0 $d-space-small $d-space-large;
  outline: none;
  cursor: pointer;

  @include md-max {
    width: #{'~"calc(100% / 3 - 20px)"'} !important;
  }

  &__image-wrapper {
    position: relative;
    margin-bottom: $d-space;
    &:after {
      content: '';
      position: absolute;
      top: (-$d-space-xsmall);
      left: (-$d-space-xsmall);
      bottom: (-$d-space-xsmall);
      right: (-$d-space-xsmall);
      border: 1px solid $c-very-light-gray;
      border-radius: $d-border-radius;
    }
    img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: $d-border-radius-small;
    }
  }
  &__name,
  &__position {
    margin: 0;
  }
  &__name {
    color: $c-gray;
    margin-bottom: $d-space-xsmall;
  }
  &__position {
    color: $c-medium-gray;
    font-weight: 400;
  }

  &--active {
    .staff-list-item {
      &__image-wrapper:after {
        border-color: $c-teal;
      }
    }
  }

  &:hover {
    .staff-list-item {
      &__image-wrapper:after {
        border-color: $c-cyan;
      }
    }
  }

  &:active {
    .staff-list-item {
      &__image-wrapper:after {
        border-color: darken($c-teal, 10%);
      }
    }
  }

  &:focus {
    .staff-list-item {
      &__image-wrapper:after {
        border-color: darken($c-teal, 5%);
      }
    }
  }

  .staff-list &__image-wrapper img {
    filter: url(#blue-mono);
  }

  &--active {
    .staff-list-item {
      &__image-wrapper {
        img {
          filter: initial;
        }
        &:after {
          border-width: 2px;
        }
      }
    }
  }
}

.staff-copy {
  strong {
    color: $c-teal;
  }
}
</styled>
