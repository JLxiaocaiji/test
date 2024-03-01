<template>
  <div id="app">
    <!-- <Map /> -->
    <!-- <MapInfowindow /> -->
    <!-- <HomeI /> -->
    <!-- <CameraTest class="aa"/> -->

    <DrawingPaper />
  </div>
</template>

<script>
// import Map from './components/Map.vue'
// import MapInfowindow from './components/Map_Infowindow.vue'
import DrawingPaper from './components/DrawingPaper.vue'
// import HomeI from './components/test/index.vue'
// import CameraTest from './components/camera'

export default {
  name: 'App',
  components: {
    // Map
    // MapInfowindow
    DrawingPaper
    // CameraTest
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 98vh;
}
.aa {
  /* float: right; */
}
</style>
