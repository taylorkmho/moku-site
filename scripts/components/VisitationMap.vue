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
          minZoom: 6,
          maxZoom: 18,
          // interactive: false,
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
      addPlace: function(options) {
        const defaults = {
          id: 'default',
          icon: {
            image: 'default-marker',
            size: 0.25,
          },
          coordinates: [-155.095, 19.715],
          description: 'no desc',
          zoomRange: {
            min: 0,
            max: 24
          }
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
          }
        });

        this.mapboxMap.setLayerZoomRange(options.id, options.zoomRange.min, options.zoomRange.max)


          // title: 'Nāwahīokalaniʻōpuʻu',
          // subtitle: 'Hawaiian medium education',
          // description: '16-120 ʻŌpūkahaʻia Street, Keaʻau',
          // logo: '/assets/logo-nawahi.svg',
        const popup = new mapboxgl.Popup({
            offset: 50 * options.icon.size,
            className: 'visitation-map-app__popup'
          })
          .setHTML(`
            <figure><img src='${options.logo}' /></figure>
            <h2>${options.title}</h2>
            <h3>${options.subtitle}</h3>
            <p>${options.description}</p>
          `)
          .addTo(this.mapboxMap);

        const popupClickEl = document.createElement('div');
        popupClickEl.classList.add('visitation-map-app__marker');
        popupClickEl.style.transform = `scale(${options.icon.size})`

        new mapboxgl.Marker(popupClickEl)
          .setLngLat(options.coordinates)
          .setPopup(popup)
          .addTo(this.mapboxMap);

        this.mapboxMap.on('zoomend', () => {
          // TODO check if should remove marker
          console.log(this.mapboxMap.getZoom())

          // options.zoomRange.min, options.zoomRange.max
        })
      },

      showMap: function() {
        if (this.mapboxMap._container.classList.contains('visitation-map-app--not-loaded')) {
          this.mapboxMap._container.classList.remove('visitation-map-app--not-loaded');
        }

        this.mapboxMap.flyTo({
          center: [-155.040, 19.650],
          pitch: 30,
          // speed: 0.5,
          speed: 5,
          zoom: 11.75,
        })

        this.addPlace({
          title: 'Nāwahīokalaniʻōpuʻu',
          subtitle: 'Hawaiian medium education',
          description: '16-120 ʻŌpūkahaʻia Street, Keaʻau',
          logo: '/assets/logo-nawahi.svg',
          id: '16-120-opukahaia',
          coordinates: [-155.0312562, 19.6056909],
          icon: { image: 'default-marker', size: 0.4 }
        })

        // TODO add punanaleo

        this.addPlace({
          title: 'ʻImiloa Astronomy Center',
          subtitle: 'Exhibition and planetarium',
          description: '600 ʻImiloa Place, Hilo',
          logo: '/assets/logo-imiloa.svg',
          id: '600-imiloa',
          coordinates: [-155.090866, 19.7011223],
        })

        this.addPlace({
          title: 'Haleʻōlelo, Ka Haka ʻUla o Keʻelikōlani Hawaiian Language College',
          subtitle: 'Hawaiian Language College',
          description: '133 Nowelo Street, Hilo',
          logo: '/assets/logo-kahaka.svg',
          id: '133-nowelo',
          coordinates: [-155.0848757, 19.7003206],
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
        background-image: linear-gradient(to bottom, var(--c-teal), #fff);
        background-size: 100% 50px;
        background-repeat: no-repeat;
        background-position: top center;
        border-radius: var(--d-border-radius);
        padding: var(--d-space-small) var(--d-padding-small) var(--d-padding-small);
        line-height: 120%;
        text-align: center;
        box-shadow: var(--d-box-shadow-large);
        figure {
          display: inline-block;
          margin: 0 auto var(--d-space-small);
          background-image: url('/assets/logo-base.png');
          background-size: cover;
          border-radius: var(--d-border-radius-small);
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
        }
        h3 {
          color: var(--c-medium-gray);
          font-size: 12px;
          font-weight: 400;
        }
        p {
          color: var(--c-medium-gray);
          font-size: 11px;
          padding-top: var(--d-space-small);
          margin-top: var(--d-space-small);
          border-top: 1px solid var(--c-very-light-gray);
        }
      }
    }
  }
</style>
