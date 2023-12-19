<template>
  
  <el-upload
    action="#"
    :show-file-list="false"
    :auto-upload="false"
    :multiple="false"
    :on-change="uploadFile"
    drag
    accept="image/jpg,image/jpeg,image/png">
    <i v-if="imageUrl" class="el-icon-circle-close deleteImg" @click.stop="handleRemove"></i>
    <img v-if="imageUrl" :src="imageUrl" class="el-upload--picture-car" />
    <div v-else>
     <i class="el-icon-picture" style="margin-top: 40px; font-size: 40px; color: #999a9c"></i>
      <div>上传图片</div>
      <div>格式为png、jpeg或jpg</div>
  </div>
</el-upload>


</template>

<el-button type="primary" @click="submitOrder">确 定</el-button>
<script>

  export default {
    name: 'testUp',
    data() {
      return {
        formData: "",
        imageUrl: "",
        orderId: "",
        userId: "",
        userName: ""
      }
    },
    methods: {
      // 上传图片
      uploadFile(item) {
  this.formData = item.raw; // 图片文件
  this.imageUrl = URL.createObjectURL(item.raw); // 图片上传浏览器回显地址
   console.log(this.imageUrl, "imageUrl")
   console.log(this.formData, "formData")
      },
      handleRemove() {
   this.imageUrl = ""
 },
 submitOrder() {
        var formData = new FormData();
        formData.append("photoFile", this.formData);  // 照片文件
        formData.append("orderId", this.orderId); // 其他参数
        formData.append("userId", this.user.id); // 其他参数
        formData.append("userName", this.user.username); // 其他参数
        // setOrderStatus(formData).then(res => {
        //   console.log(res)
        // }, err => {
        //   console.log(err)
        // })

        console.log(formData)
 }
    }
  }
</script>
<style scoped>
.deleteImg {
    font-size: 30px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
}
img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
}
</style>