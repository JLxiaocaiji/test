<template>
  <div>
    <div class="h5-play-wrap" />

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

    <el-description title="设备信息">
        <el-descriptions-item label="设备ip">{{ formDevice.ip }}</el-descriptions-item>
        <el-descriptions-item label="端口">{{ formDevice.port }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ formDevice.username }}</el-descriptions-item>
        <el-descriptions-item label="密码">{{ formDevice.password }}</el-descriptions-item>
        <el-descriptions-item label="窗口分割">{{ formDevice.partition }}</el-descriptions-item>
        <el-descriptions-item label="设备名称">111</el-descriptions-item>
        <el-descriptions-item label="设备编号">222</el-descriptions-item>
        <el-descriptions-item label="设备地址">333</el-descriptions-item>
    </el-description>

    <el-form ref="form" :model="formCamera" :rules="rules">
        <el-form-item label="p">
            <el-input v-model="formCamera.ip" placeholder="请输入设备ip"></el-input>
        </el-form-item>

        <el-form-item label="通道列表">
            <el-select v-model="formCamera.channel" placeholder="请选择通道">
                <el-option
                    v-for="item in optionsChannel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="码流类型">
            <el-select v-model="formCamera.streamType" placeholder="码流类型">
            <el-option
                v-for="item in streamTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        </el-form-item>
        
        <el-form-item>
            <el-slider v-model="value2"></el-slider><span>(范围: 0~1)</span>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" >打开声音</el-button>
            <el-button type="primary" >关闭声音</el-button>
            <el-button type="primary" >开始对讲</el-button>
            <el-button type="primary" >停止对讲</el-button>
            <el-button type="primary" >抓图</el-button>
            <el-button type="primary" >开始录像</el-button>
            <el-button type="primary" >停止录像</el-button>
            <el-button type="primary" >全屏</el-button>
            <el-button type="primary" >开启电子放大</el-button>
            <el-button type="primary" >关闭电子放大</el-button>
            <el-button type="primary" >开启区域放大</el-button>
            <el-button type="primary" >关闭区域放大</el-button>
        </el-form-item>
    </el-form>

    <el-form ref="form" :model="formControl" :rules="rules">
        <el-form-item label="步长(1-8)">
            <el-select v-model="formControl.stepSize" placeholder="请选择步长">
                <el-option
                    v-for="item in stepSizeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <template v-for="(item) in positionControlPlatform">
                <el-button type="primary" :key="item.label">{{ item.label }}</el-button>
            </template>
        </el-form-item>

        <el-form-item>
            <template v-for="(item) in zoomControlPlatform">
                <el-button type="primary" :key="item.label">{{ item.label }}</el-button>
            </template>
        </el-form-item>

        <el-form-item label="预置点">
            <el-input placeholder="请输入预置点"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary">查看</el-button>
            <el-button type="primary">增加</el-button>
            <el-button type="primary">删除</el-button>
        </el-form-item>
    </el-form>

    <el-form ref="form" :model="videoControl" :rules="rules">
        <el-form-item>
            <span>开始时间</span>
            <el-date-picker
            v-model="timeBegin"
            type="datetime"
            placeholder="选择日期时间"
            />
        </el-form-item>
        <el-form-item>
            <span>结束时间</span>
            <el-date-picker
            v-model="timeEnd"
            type="datetime"
            placeholder="选择日期时间"
            />
        </el-form-item>
        
        <el-form-item label="通道列表">
            <el-select v-model="videoControl.channel" placeholder="请选择通道">
                <el-option
                    v-for="item in optionsChannel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-table
            :data="videoData"
            style="width: 100%">
            <el-table-column prop="index" label="索引" width="180" align="center"/>
            <el-table-column prop="time" label="时间" width="180" align="center"/>
            <el-table-column prop="fileSize" label="文件大小(KB)" width="180" align="center"/>
            <el-table-column prop="timeStamp" label="时间戳" width="180" align="center"/>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
        </el-pagination>

        <el-form-item>
            <el-button>下载</el-button>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
            <el-button>取消下载</el-button>
        </el-form-item>

        <el-form-item>
            <template v-for="(item) in videoControlList">
                <el-button :key="item.label">{{ item.label }}</el-button>
            </template>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
    name: 'CameraI',
    data () {
      return {
        // device
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

        formCamera: {
            optionsChannel: '',
            streamType: '',
        },
        value2: '',


        optionsChannel: [
            { label: 'D1', value: 1},
            { label: 'D2', value: 2},
            { label: 'D3', value: 3},
        ],
        streamTypeList: [
            { label: '主码流', value: 1},
            { label: '辅码流', value: 2},
        ],

        formControl: {
            stepSize: null,

        },
        stepSizeList: [
            { label: 1, size: 1 },
            { label: 2, size: 2 },
            { label: 3, size: 3 },
            { label: 4, size: 4 },
            { label: 5, size: 5 },
            { label: 6, size: 6 },
            { label: 7, size: 7 },
            { label: 8, size: 8 },
        ],

        positionControlPlatform: [
            { label: "左上", value: 'LeftUp' },
            { label: "上", value: 'Up'},
            { label: "右上", value: 'RightUp'},
            { label: "左", value: 'Left' },
            { label: "自动", value: 'Auto' },
            { label: "右", value: 'Right' },
            { label: "左下" , value: 'LeftDown' },
            { label: "下" , value: 'Down' },
            { label: "右下", value: 'RightDown'},
        ],

        zoomControlPlatform: [
            { label: "变倍-", value: 'ZoomWide' },
            { label: "变倍+", value: 'ZoomTele' },
            { label: "聚焦-", value: 'FocusFar' },
            { label: "聚焦+", value: 'FocusNear' },
            { label: "光圈-", value: 'IrisSmall' },
            { label: "光圈+", value: 'IrisLarge' },
        ],

        videoControl: {
            timeBegin: '',
            timeEnd: '',
        },
        videoData: [],
        videoControlList: [
            { label: '开始回放(双击列表行)', value: 'start'},
            { label: '暂停', value: 'stop'},
            { label: '继续', value: 'continue'},
            { label: '结束回放', value: 'end'},
        ]
      }
    },

    methods: {
        submit() {
            
        }
    }
}
</script>

<style lang="scss" scoped>
</style>