<template>
  <div>
    <select-options
      :prop="'nodeType'"
      :label="'节点类型'"
      v-model="form.nodeType"
      :placeholder="'请输入节点类型'"
      :options="options1"
    />
    <button @click="click">click</button>
  </div>
</template>
  
  <script>
  import SelectOptions from './CustomModel'
  
  export default {
    name: 'HomeI',
    components: {
      SelectOptions,
    },
    data () {
      return {
        form: {
          nodeType: 0
        },
        options1: [
          { label:'a1', value: 1},
        
          { label:'b2', value: 2},
        
          { label: 'c3', value: 3},
      ]
      }
    },

    methods: {
      click() {
        new Promise((resolve) => {
        resolve("Success!");
      }).then(()=> {
          this.form = { 
          nodeType: 2
          }
        })
      }
    }
  }
  </script>