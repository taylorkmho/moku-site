<template>
  <div id="visitation-map-app" class="visitation-map-app visitation-map-app--not-loaded"></div>
</template>

<script>
  import { Map } from 'mapbox-gl/dist/mapbox-gl';
  import mapboxgl from 'mapbox-gl';

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
          interactive: false,
        }
      );

      this.mapboxMap.scrollZoom.disable();

      this.mapboxMap.on('load', () => {
        this.showMap()
      })
    },
    methods: {
      addMarker: function(asset, assetName, coordinates, size) {

        this.mapboxMap.loadImage(asset, (error, image) => {
          if (error) throw error;

          this.mapboxMap.addImage(assetName, image);

          this.mapboxMap.addLayer({
            "id": assetName,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [{
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": coordinates || [-155.095, 19.715]
                  }
                }]
              }
            },
            "layout": {
              "icon-image": assetName,
              "icon-size": size || 1
            }
          });
        });
        // map-kuikahi-label.png
      },
      showMap: function() {
        if (this.mapboxMap._container.classList.contains('visitation-map-app--not-loaded')) {
          this.mapboxMap._container.classList.remove('visitation-map-app--not-loaded');
        }

        this.mapboxMap.flyTo({
          center: [-155.040, 19.650],
          pitch: 30,
          speed: 0.5,
          zoom: 11.75,
        })

        this.addMarker('/assets/map-marker.png', '16-120-opukahaia', [-155.0312562, 19.6056909], 0.4)
        this.addMarker('/assets/map-marker.png', '600-imiloa', [-155.090866, 19.7011223], 0.25)
        this.addMarker('/assets/map-marker.png', '133-nowelo', [-155.0848757, 19.7003206], 0.25)

        this.mapboxMap.once('moveend', () => {
          this.mapboxMap.addControl(new mapboxgl.NavigationControl({showCompass: false}));
          this.mapboxMap.dragPan.enable();
        })
      }
    }
  }
</script>

<style scoped>
  .visitation-map-app,
  .mapboxgl-map {
    height: 100%;
  }

  .visitation-map-app {
    transition: 300ms ease-out opacity;
    &--not-loaded {
      opacity: 0;
    }
  }
</style>
