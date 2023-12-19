<template>
    <div class="home">
      <h3>输入的实时内容：{{ myValue.a }}</h3>
      <custom-model v-model="myValue.a"></custom-model>
    </div>
  </template>
  
  <script>
  import CustomModel from './CustomModel'
  
  export default {
    name: 'HomeI',
    components: {
      CustomModel,
    },
    data () {
      return {
        myValue: {
          a:  ''
        }
      }
    },
  }
  </script>