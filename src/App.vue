<template>
  <div id="app">
    <!-- <Map /> -->
    <!-- <HomeI /> -->
    <CameraTest />
  </div>
</template>

<script>
// import Map from './components/Map.vue'
// import HomeI from './components/test/index.vue'
import CameraTest from './components/camera'

export default {
  name: 'App',
  components: {
    // Map
    CameraTest
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 98vh;
}
</style>
