<template>
  <div id="visitation-map-app" class="visitation-map-app visitation-map-app--not-loaded"></div>
</template>

<script>
  import { Map } from 'mapbox-gl/dist/mapbox-gl';
  import mapboxgl from 'mapbox-gl';
  import { setDefaults } from '../helpers'

  mapboxgl.accessToken = "pk.eyJ1IjoidGF5bG9ya21obyIsImEiOiJjanJ1N3Mxc2owanZ1NDNvMDdiMXQ4ZmJpIn0.DH0Q8yC7eO5vl5kQhr_nbQ";

  export default {
    name: 'VisitationMap',
    data() {
      return {
        DEFAULT_ZOOM: 11.75,
        DEFAULT_COORDS: [-155.040, 19.650]
      }
    },
    mounted() {
      this.mapboxMap = new Map(
        {
          container: 'visitation-map-app',
          style: 'mapbox://styles/taylorkmho/cjru9t9jm0ax51fukh6xqpe2d',
          center: [-160.500, 21.900],
          pitch: 0,
          zoom: 9,
          minZoom: 4,
          maxZoom: 18,
          interactive: false,
        }
      );

      this.addMarkerImage(this.mapboxMap, 'default-marker', '/assets/map-marker.png')

      this.mapboxMap.scrollZoom.disable();

      this.mapboxMap.on('load', () => {
        this.showMap()
      })
    },
    methods: {
      addMarkerImage: function(mapboxMap, name, url) {
        mapboxMap.loadImage(url, (error, image) => {
          mapboxMap.addImage(name, image);
        })
      },
      addMarker: function(options) {
        const defaults = {
          id: 'default',
          icon: {
            image: 'default-marker',
            size: 0.25,
          },
          coordinates: [-155.095, 19.715],
          zoomRange: [0, 24]
        }

        options = setDefaults(options, defaults)

        this.mapboxMap.addLayer({
          "id": options.id,
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": options.coordinates
                }
              }]
            }
          },
          "layout": {
            "icon-image": options.icon.image,
            "icon-size": options.icon.size
          },
          "minzoom": options.zoomRange[0],
          "maxzoom": options.zoomRange[1]
        });

        const isZoomer = !!options.zoomTo
        if (isZoomer) {
          this.mapboxMap.on('click', options.id, () => {
            this.mapboxMap.easeTo({
              zoom: options.zoomTo,
              center: options.zoomToCoordinates || options.coordinates,
            })
          })
        }

        const hasPopup = !!options.subtitle || !!options.description || !!options.logo;
        let popup = null
        if (hasPopup) {
          let logo = '';
          if (options.logo instanceof Array) {
            options.logo.forEach((item)=>{
              logo += `<figure><img src='${item}' /></figure>`
            })
          } else {
            logo += `<figure><img src='${options.logo}' /></figure>`
          }

          popup = new mapboxgl.Popup({
              offset: 50 * options.icon.size,
              className: 'visitation-map-app__popup'
            })
            .setHTML(`
              <header>${logo}</header>
              <h2>${options.title}</h2>
              <h3>${options.subtitle}</h3>
              <p>${options.description}</p>
            `)
            .addTo(this.mapboxMap);
        }

        const markerClickListener = document.createElement('div');
        markerClickListener.classList.add('visitation-map-app__marker');

        const marker = new mapboxgl.Marker(markerClickListener)
          .setLngLat(options.coordinates)
          .setPopup(popup) // can be set to null
          .addTo(this.mapboxMap);

        this.mapboxMap.on('zoomend', () => {
          const zoomLevel = this.mapboxMap.getZoom()
          const isOutOfRange = zoomLevel < options.zoomRange[0] || zoomLevel > options.zoomRange[1]

          if (isOutOfRange) {
            marker.remove();
          } else {
            marker.addTo(this.mapboxMap)
          }
        })
      },

      showMap: function() {
        if (this.mapboxMap._container.classList.contains('visitation-map-app--not-loaded')) {
          this.mapboxMap._container.classList.remove('visitation-map-app--not-loaded');
        }

        this.mapboxMap.flyTo({
          center: this.DEFAULT_COORDS,
          pitch: 30,
          speed: 0.5,
          fadeDuration: 200,
          zoom: this.DEFAULT_ZOOM,
        })

        this.addMarker({
          id: 'hilo',
          title: 'Hilo',
          coordinates: [-155.0608837, 19.668792],
          icon: { image: 'default-marker', size: 0.65 },
          zoomTo: 11,
          zoomToCoordinates: this.DEFAULT_COORDS,
          zoomRange: [0, 9],
        })

        this.addMarker({
          id: 'split-hilo',
          title: 'Hilo Locations',
          coordinates: [-155.0940677, 19.707875],
          icon: { image: 'default-marker', size: 0.5 },
          zoomTo: this.DEFAULT_ZOOM,
          zoomToCoordinates: [-155.0931949, 19.6637184],
          zoomRange: [9, 11.5],
        })

        this.addMarker({
          id: 'split-keaau',
          title: 'Keaʻau',
          coordinates: [-155.0312562, 19.6056909],
          icon: { image: 'default-marker', size: 0.5 },
          zoomTo: this.DEFAULT_ZOOM,
          zoomToCoordinates: [-155.0383607, 19.632712],
          zoomRange: [9, 11.5],
        })

        this.addMarker({
          id: '16-120-opukahaia',
          title: 'ʻAha Pūnana Leo o Hilo & Nāwahīokalaniʻōpuʻu',
          subtitle: 'Hawaiian medium education schools',
          description: '16-120 ʻŌpūkahaʻia Street, Keaʻau',
          logo: ['/assets/logo-punanaleo.svg', '/assets/logo-nawahi.svg'],
          coordinates: [-155.0312562, 19.6056909],
          icon: { image: 'default-marker', size: 0.4 },
          zoomRange: [11.5, 24],
        })

        // TODO add punanaleo

        this.addMarker({
          id: '600-imiloa',
          title: 'ʻImiloa Astronomy Center',
          subtitle: 'Exhibition and planetarium',
          description: '600 ʻImiloa Place, Hilo',
          logo: '/assets/logo-imiloa.svg',
          coordinates: [-155.090866, 19.7011223],
          zoomRange: [11.5, 24],
        })

        this.addMarker({
          id: '133-nowelo',
          title: 'Haleʻōlelo, Ka Haka ʻUla o Keʻelikōlani Hawaiian Language College',
          subtitle: 'Hawaiian Language College',
          description: '133 Nowelo Street, Hilo',
          logo: '/assets/logo-kahaka.svg',
          coordinates: [-155.0848757, 19.7003206],
          zoomRange: [11.5, 24],
        })

        this.mapboxMap.once('moveend', () => {
          this.mapboxMap.addControl(new mapboxgl.NavigationControl({showCompass: false}));
          this.mapboxMap.dragPan.enable();
        })
      }
    }
  }
</script>

<style>
  .visitation-map-app,
  .mapboxgl-map {
    height: 100%;
  }

  .visitation-map-app {
    transition: 300ms ease-out opacity;

    &--not-loaded {
      opacity: 0;
    }

    &__marker {
      cursor: pointer;
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }

    &__popup {
      width: 100%;
      max-width: 240px;
      opacity: 0;
      transition: opacity 150ms ease-out;
      &[class*="mapboxgl-popup-anchor"] {
        opacity: 1;
      }
      &.mapboxgl-popup-anchor-top,
      &.mapboxgl-popup-anchor-top-left,
      &.mapboxgl-popup-anchor-top-right {
        .mapboxgl-popup-tip {
          border-bottom-color: var(--c-teal);
        }
      }
      .mapboxgl-popup-content {
        background: #fff;
        background-image: url('/assets/bg-popup.png');
        background-size: 100% 50px;
        background-repeat: no-repeat;
        background-position: top center;
        border-radius: var(--d-border-radius);
        padding: var(--d-space-small) var(--d-padding-small) var(--d-padding-small);
        text-align: center;
        box-shadow: var(--d-box-shadow-large);
        header {
          margin: 0 0 var(--d-space-small);
        }
        figure {
          display: inline-block;
          margin: 0 var(--d-space) 0 0;
          background-image: url('/assets/logo-base.png');
          background-size: cover;
          border-radius: var(--d-border-radius-small);
          border: 1px solid var(--c-teal--very-light);

          &:last-of-type {
            margin-right: 0;
          }

          img {
            display: block;
          }
        }
        h2, h3, p {
          margin: 0 auto;
        }
        h2 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: var(--d-space-small);
          line-height: 120%;
        }
        h3 {
          color: var(--c-medium-gray);
          font-size: 12px;
          font-weight: 400;
          line-height: 100%;
        }
        p {
          color: var(--c-medium-gray);
          font-size: 11px;
          line-height: 100%;
          padding-top: var(--d-space-small);
          margin-top: var(--d-space-small);
          border-top: 1px solid var(--c-very-light-gray);
        }
      }
    }
  }
</style>
