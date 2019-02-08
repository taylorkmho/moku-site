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
          center: [-155, 18],
          bearing: 20,
          pitch: 50,
          maxZoom: 13,
          minZoom: 5,
          zoom: 6.25,
          clickTolerance: 10
        }
      );

      this.mapboxMap.addControl(new mapboxgl.NavigationControl());
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
          center: [-157.2057315, 20.3432828],
          bearing: 0,
          pitch: 10,
          speed: 0.0625,
        })

        // this.addMarker('/assets/map-marker.png', 'map-marker', [-155.095, 19.715], 0.5)
        this.addMarker('/assets/map-marker.png', '600-imiloa', [-155.066, 19.693], 0.75)
        this.addMarker('/assets/map-marker.png', '16-120-opukahaia', [-155.036, 19.642], 0.725)
        this.addMarker('/assets/map-marker.png', '133-nowelo', [-155.099, 19.706], 0.75)
        this.addMarker('/assets/map-kuikahi-label.png', 'map-label', [-154.637, 20.143], 0.33)
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
