<template>
  <div class="content">
    <div slot="header" class="header">
      <div class="pic">
        <el-image :src="url"></el-image>
      </div>

      <el-descriptions size="small" :column="1">
        <el-descriptions-item label="姓名">{{this.data.name}}</el-descriptions-item>
        <el-descriptions-item label="编号">{{this.data.name}}</el-descriptions-item>
        <el-descriptions-item label="地址">{{this.data.name}}</el-descriptions-item>
        <el-descriptions-item label="爱好">{{this.data.name}}</el-descriptions-item>
        <!-- <el-descriptions-item label="姓名">皮卡丘</el-descriptions-item>
        <el-descriptions-item label="编号">22222</el-descriptions-item>
        <el-descriptions-item label="地址">66666</el-descriptions-item>
        <el-descriptions-item label="爱好">放电</el-descriptions-item> -->
      </el-descriptions>
    </div> 
    <el-divider class="divider"/>
    <div>
      <el-descriptions size="small" :column="3" direction="vertical">
        <el-descriptions-item label="传感器ID">11111</el-descriptions-item>
        <el-descriptions-item label="压力测量值">22222</el-descriptions-item>
        <el-descriptions-item label="时间">33333</el-descriptions-item>
        <el-descriptions-item label="4G模块编号">444</el-descriptions-item>
        <el-descriptions-item label="信号强度">55555</el-descriptions-item>
        <el-descriptions-item label="地址">66666</el-descriptions-item>
      </el-descriptions>
    </div>
    
  </div>
</template>

<script>
import picUrl from '@/assets/OIP.jpg'

export default {
  name: "InfoWindow",
  data() {
    return {
      overlay: null,
      infoWindow: null,
      isInfo: true,
      url:  picUrl,
      // data: null,
    };
  },

  props: {
    data: {
      type: Object,
      default: function () {
        return { 
          name: '皮卡丘',
          number: '22222',
          address: '66666',
          hobby: '放电',
          id: '11111',
          value: '皮卡丘',
          time: '22222'
        }
      }
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      // this.overlay = e.overlay;
      // this.infoWindow = e.infoWindow;

      new Promise((resolve) => {
        resolve("Success!");
      }).then( 
        // this.data = {
        //   name: '皮卡丘',
        //   number: '22222',
        //   address: '66666',
        //   hobby: '放电',
        //   id: '11111',
        //   value: '皮卡丘',
        //   time: '22222'
        // }
      )
    },
    //关闭 
    close() {
      this.infoWindow.close();
    },
    edit() {
      console.log("编辑按钮测试");
    },
    del() {
      console.log("删除按钮测试");
    },
  },
};
</script>
   
<style lang="scss" scoped>
.content {
  text-align: center;
  align-items: center;
  margin-top: 20px;

  ::v-deep .el-descriptions__table {
    background-color: rgb(31, 40, 53);
    color: rgb(40, 160,244);
  }
 
  ::v-deep .el-descriptions-item__label{
    text-align: center;
  }

  ::v-deep .el-descriptions-item__content{
    text-align: center;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr 2fr;

    .pic {
      width: 100px;
      height: 100%;
      margin-right: 10px;
    }
  }
  .divider {
    margin: 6px 0;
  }

}

</style>