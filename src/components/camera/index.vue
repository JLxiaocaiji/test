<template>
    <div>
        <video id="video" />
        <el-form ref="form" :model="formDevice" :rules="rules">
            <el-form-item label="设备ip">
                <el-input v-model="formDevice.ip" placeholder="请输入设备ip"></el-input>
            </el-form-item>
            <el-form-item label="端口">
                <el-input v-model="formDevice.port" placeholder="请输入端口"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="formDevice.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formDevice.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="窗口分割">
                <el-select v-model="formDevice.partition" placeholder="请选择窗口数">
                    <el-option
                        v-for="item in optionsWindow"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit">登录</el-button>
                <el-button>注销</el-button>
            </el-form-item>
        </el-form>
    </div>
  </template>
<script>
// import { RPC } from './module/PlayerControl.js'

export default {
    name: 'CameraTest',

    data(){
        return {
            formDevice: {
                ip: '10.50.7.202',
                port: '80',
                username: 'admin',
                password: 'Admin123',
                partition: '',
            },
            rules: {
            },
            optionsWindow: [
                { label: '1x1', value: 1},
                { label: '2x2', value: 2},
                { label: '3x3', value: 3},
                { label: '4x4', value: 4},
            ],
        }
    },

    methods: {
        submit() {
            console.log(this.formDevice.username)
            console.log(this.formDevice.password)

            setIP(this.formDevice.ip + ':' + this.formDevice.port )
            // RPC.login(
            //     this.formDevice.username, 
            //     this.formDevice.password, 
            //     false
            // ).then((res) => {
            //     console.log(res)
            // }).catch((err) => {
            //     console.log(err);
            // })
        }
    }
}
</script>