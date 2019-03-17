<template>
  <div class="indigenous-language-map-container">
    <div
      id="indigenous-language-map-app"
      :class="{
        'indigenous-language-map-app': true,
        'indigenous-language-map-app--not-loaded': !hasLoaded,
      }"
    ></div>
  </div>
</template>

<script>
import axios from 'axios'
import { Map } from 'mapbox-gl/dist/mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { setDefaults } from '../helpers'

mapboxgl.accessToken =
  'pk.eyJ1IjoidGF5bG9ya21obyIsImEiOiJjanJ1N3Mxc2owanZ1NDNvMDdiMXQ4ZmJpIn0.DH0Q8yC7eO5vl5kQhr_nbQ'
const DEFAULT_ZOOM = 1.25
const DEFAULT_COORDS = [-158.7018857, 41.591337]

export default {
  name: 'IndigenousLanguageMap',
  props: {
    url: String,
  },
  data() {
    return {
      hasLoaded: false,
      languages: [],
      waypoints: [],
    }
  },
  mounted() {
    this.mapboxMap = new Map({
      container: 'indigenous-language-map-app',
      style: 'mapbox://styles/taylorkmho/cjt86z5px1wf31fph9ftztm5b',
      center: DEFAULT_COORDS,
      pitch: 0,
      zoom: DEFAULT_ZOOM,
      minZoom: 1,
      maxZoom: 18,
    })

    this.addMarkerImage(
      this.mapboxMap,
      'default-marker',
      '/assets/map-marker-white.png'
    )

    this.mapboxMap.on('load', () => {
      this.fetchItems()
      this.initMap()
    })
  },
  methods: {
    addMarker: function(options) {
      const defaults = {
        id: 'default',
        icon: {
          image: 'default-marker',
          size: 0.25,
        },
        coordinates: [-155.095, 19.715],
        zoomRange: [0, 24],
      }

      options = setDefaults(options, defaults)

      this.mapboxMap.addLayer({
        id: options.id,
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: options.coordinates,
                },
              },
            ],
          },
        },
        layout: {
          'icon-image': options.icon.image,
          'icon-size': options.icon.size,
        },
        minzoom: options.zoomRange[0],
        maxzoom: options.zoomRange[1],
      })

      const isZoomer = !!options.zoomTo
      if (isZoomer) {
        this.mapboxMap.on('click', options.id, () => {
          this.mapboxMap.easeTo({
            zoom: options.zoomTo,
            center: options.zoomToCoordinates || options.coordinates,
          })
        })
      }

      const hasPopup = !!options.title
      let popup = null
      if (hasPopup) {
        popup = new mapboxgl.Popup({
          offset: 50 * options.icon.size,
          className: 'indigenous-language-map-app__popup',
        })
          .setHTML(
            `
              <a href="#language-${options.id}">
                <h6>${options.location}</h6>
                <h2>${options.title}</h2>
              </a>
            `
          )
          .addTo(this.mapboxMap)
      }

      const markerClickListener = document.createElement('div')
      markerClickListener.classList.add('visitation-map-app__marker')

      const marker = new mapboxgl.Marker(markerClickListener)
        .setLngLat(options.coordinates)
        .setPopup(popup)
        .addTo(this.mapboxMap)

      const zoomLevel = this.mapboxMap.getZoom()
      const isOutOfRange =
        zoomLevel < options.zoomRange[0] || zoomLevel > options.zoomRange[1]
      if (isOutOfRange) {
        marker.remove()
      } else {
        marker.addTo(this.mapboxMap)
      }

      this.mapboxMap.on('zoomend', () => {
        const zoomLevel = this.mapboxMap.getZoom()
        const isOutOfRange =
          zoomLevel < options.zoomRange[0] || zoomLevel > options.zoomRange[1]
        if (isOutOfRange) {
          marker.remove()
        } else {
          marker.addTo(this.mapboxMap)
        }
      })
    },
    addMarkerImage: function(mapboxMap, name, url) {
      mapboxMap.loadImage(url, (error, image) => {
        mapboxMap.addImage(name, image)
      })
    },
    fetchItems: function() {
      axios
        .get(`${this.url}?format=json`)
        .then(response => {
          if (response.data.items === undefined) return

          return response.data.items.map(language => {
            return {
              id: language.id,
              lat: language.location.mapLat,
              lng: language.location.mapLng,
              title: language.title,
              location: language.customContent.location,
            }
          })
        })
        .then(languages => {
          this.setupMarkers(languages)
          languages.forEach((language, languageIndex) => {
            this.$set(this.languages, languageIndex, language)
          })
        })
        .catch(error => {
          throw error
        })
    },
    initMap: function() {
      this.hasLoaded = true
      this.mapboxMap.scrollZoom.disable()
      this.mapboxMap.addControl(
        new mapboxgl.NavigationControl({ showCompass: false })
      )
    },
    setupMarkers: function(languages) {
      languages.forEach((language, languageIndex) => {
        this.addMarker({
          id: language.id,
          title: language.title,
          location: language.location,
          coordinates: [`${language.lng}`, `${language.lat}`],
          icon: { image: 'default-marker', size: 0.35 },
        })
      })
      this.addMarker({
        id: 'zoom-to-midwest-america',
        coordinates: [-101.887666, 42.607335],
        icon: { image: 'default-marker', size: 1 },
        zoomTo: 4,
        zoomToCoordinates: [-101.887666, 42.607335],
        zoomRange: [0, 3],
      })
      this.addMarker({
        id: 'zoom-to-east-america',
        coordinates: [-73.71056, 43.063103],
        icon: { image: 'default-marker', size: 0.8 },
        zoomTo: 4,
        zoomToCoordinates: [-73.71056, 43.063103],
        zoomRange: [0, 3],
      })
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/base.scss';

.indigenous-language-map-container {
  max-width: 100vw;
  overflow: hidden;
}

.indigenous-language-map-app {
  outline: none;
  transition: opacity 150ms ease-out;

  &--not-loaded {
    opacity: 0;
    pointer-events: none;
  }

  .mapboxgl-canvas {
    outline: none;
  }

  &__popup {
    color: $c-gray;
    width: 100%;
    max-width: 240px;

    .mapboxgl-popup-content {
      border-radius: $d-border-radius;
      padding: $d-padding-small;
    }

    h6 {
      margin: 0;
      color: $c-medium-gray;
      font: 600 12px $f-sans;
      text-transform: uppercase;
    }

    h2 {
      margin: 0;
      color: $c-gray;
      font: 400 22px $f-serif;
    }

    a:hover {
      h6,
      h2 {
        color: $c-teal;
      }
    }
  }
}
</style>
