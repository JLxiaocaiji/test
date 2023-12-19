<template>
  <!-- 自定义组件中使用v-mode指令 -->
  <el-select 
        :value="bindValue" 
        @change="change"
        clearable
        style="width: 100%"
        >
            <el-option 
                v-for="dict in options"
                :key="dict.label"
                :label="dict.label"
                :value="dict.value"
            />
        </el-select>
</template>

<script>
export default {
  name: 'SelectOptions',
  model: {
        prop: 'bindValue',
        event: 'change',
    },
    props: {
        label: {
            type: String,
            default: '',
            required: true,
        },
        prop: {
            type: String,
            default: '',
            required: true,
        },
        bindValue: {
            type:  Number,
            default: 0,
            required: true,
        },
        options: {
            type: Array,
            default: ()=> {
              return []
            },
            required: true,
        },

    },
  
    methods: {
      change(e) {
          console.log(e)
          this.$emit('change', e)
      },
    },
}
</script>