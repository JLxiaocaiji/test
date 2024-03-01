<template>
  <div>
    <!-- <el-input placeholder="请输入地点关键字" id="input"  v-model="searchParam" class="input" /> -->

    <div id="map-container"></div>
    <info-window ref="infoWindow" v-show="show"></info-window>

  </div>
</template>

<script>
import mapOptions from '@/utils/mapConfig/index.js'
import InfoWindow from './InfoWindow.vue'

window._AMapSecurityConfig = {
  securityJsCode: "f37b8531a45506836a61ae8562a1b080" // 安全密钥
};

export default {
  name: 'InitMap',
  components: {
    InfoWindow
  },

  data() {
    return {
      map: null,
      placeSearch: null,
      auto: null,
      select: null,
      marker: null,
      mouseTool: null,
      overlays: null,
      searchParam: '',
      show: false,
    }
  },

  created() {
    this.initMap();
  },

  unmounted() {
    this.map?.destroy();
  },

  methods: {
    // 初始化地图
    initMap() {
      mapOptions.initMap().then(AMap => {
          this.map = new AMap.Map("map-container", {
            viewMode: "3D", //  是否为3D地图模式
            
            zoom: 10, // 初始化地图级别
            // center: [121.625075, 29.860307], // 宁波
            center: [121.429729, 29.287929], // 宁海县
            resizeEnable: true,

            layers:[
                // 展示道路信息
                new AMap.TileLayer.RoadNet({
                    //rejectMapMask:true
                }),
                // 卫星图层类，继承自 TileLayer
                new AMap.TileLayer.Satellite()
            ]
          });

          /*
          // 关键字查询
          var autoOptions = {
            // 城市，默认全国
            city: "宁波",
            citylimit: true,
            // 使用联想输入的input的id
            input: "input"
          };

          this.auto = new AMap.AutoComplete(autoOptions);
          this.auto.on("select", this.search); //注册监听，当选中某条记录时会触发
          */

          this.placeSearch = new AMap.PlaceSearch({
            // map: this.map,
            // panel: "panel", // 结果列表将在此容器中进行展示。

            // type: "", //数据类别
            // pageSize: 10, //每页结果数,默认10
            // pageIndex: 1, //请求页码，默认1
            city: "宁波", // 兴趣点城市
            autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            extensions: "base" //返回基本地址信息
          });

          this.searchPosition('西子国际')


          console.log(this.auto)

          this.addMapController()
          
          //添加固定点标记
          let marker1 = new AMap.Marker({
            position: new AMap.LngLat(121.625075, 29.860307), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "宁波"
          });
          //添加点标记
          this.map.add(marker1);

          // 鼠标事件
          this.map.on('click', (e) => {
            // console.log(e.lnglat.lat) // 经度
            // console.log(e.lnglat.lng) // 纬度
            console.log(e)
            // this.marker == null ? '' : this.map.remove(this.marker)

          })

          // 地图上绘制点位
          this.mouseTool = new AMap.MouseTool(this.map);
          // 监听draw事件可获取画好的覆盖物
          this.mouseTool.on(
            "draw",
            function(e) {
              console.log("获取画好的覆盖物", e);
              this.overlays.push(e.obj);
            }.bind(this)
          );





          let opts = {
            // 关键字对应的行政区级别或商圈
            level: 'district',
            // 显示下级行政区级数
            subdistrict: 2,
            // 是否返回行政区边界坐标点
            extensions: 'all',
            // 是否显示商圈
            showbiz: true,
          };

          // 行政区查询服务
          new AMap.DistrictSearch(opts).search('宁海县', (status, res )=> {
            console.log(status)
            console.log(res)

            let outer = [
              new AMap.LngLat(-360,90,true),
              new AMap.LngLat(-360,-90,true),
              new AMap.LngLat(360,-90,true),
              new AMap.LngLat(360,90,true),
            ];

            let holes = res.districtList[0].boundaries

            let pathArray = [
                outer
            ];
            console.log(pathArray)
            console.log(holes)
            pathArray.push.apply(pathArray,holes)
            let polygon = new AMap.Polygon({
                pathL:pathArray,
                strokeColor: '#00eeff',
                strokeWeight: 1,
                fillColor: 'rgb(62, 71, 85)',
                fillOpacity: 0.5
            });
            polygon.setPath(pathArray);
            this.map.add(polygon)
          })

          this.map.on('zoomchange', ()=> console.log(this.map.getZoom()))
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    // 添加地图控件
    addMapController()  {
      // 添加左下角的比例尺
      this.map.addControl(new AMap.Scale());

      // 地图操作工具条插件
      let toolBar = new AMap.ToolBar({
        position: {
          bottom: "400px",
          right: "40px"
        }
      });

      // 组合了旋转、倾斜、复位在内的地图控件
      let controlBar = new AMap.ControlBar({
        position: {
          bottom: "280px",
          right: "10px"
        }
      });

      this.map.addControl(toolBar); // 添加右下角的放大缩小
      this.map.addControl(controlBar); // 方向盘
      this.map.addControl(new AMap.MapType()); // 添加右上角的标准图和卫星图  和路况
      this.map.addControl(new AMap.HawkEye()); // 添加地图放大镜
    },

    // 搜索地点  数组
    searchPosition(position) {
      let positionArr = []
      this.placeSearch.search(position, (status, res)=> {
        console.log(status)
        console.log(res)
        res.poiList.pois.forEach( item => {
          // let temp = [item.location.lng, item.location.lat]
          let temp = [item.location.lng, item.location.lat, item.name]
          positionArr.push(temp)
        })
        // 设置居中
        // let position = [temp.lng , temp.lat]
        // this.map.setCenter(position)
        this.addMarkers(positionArr)
      })
    },

    // 添加 marker
    addMarkers(positionArr) {
      console.log(positionArr)
      let tempArr = []
      positionArr.forEach( item => {
        let marker = new AMap.Marker({
          position: new AMap.LngLat(item[0], item[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: item[2],
          label: {
            direction:'top',
            offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
            content: `<div>${item[2]}</div>`, //设置文本标注内容
          },
        });

        marker.on("click", 
          ()=>this.openInfo(item.toSpliced(2))
        );
        tempArr.push( marker)
      })
      // 批量增加 marker
      this.map.add(tempArr)
    },

    // infowindow
    openInfo(position) {
      this.show = true
      console.log(position)
      let infoWindow = new AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        closeWhenClickMap: true,
        anchor: "bottom-center",
        label: {
          direction: 'top',
        },
        offset: new AMap.Pixel(-15, -100),

        content: this.$refs.infoWindow.$el,
      });

      this.map.setZoomAndCenter(17, position, 1000)

      infoWindow.open(this.map, position);

      // this.map.on('click', () => { infoWindow.close() })
    }
  }
}
</script>


<style lang="scss" scoped>
#map-container {
  width: 100%;
  height: 98vh;
}

::v-deep .amap-info{
  background-color: rgb(31, 40, 53);
  width: 20vw;
  height: 10vh;
  opacity: 0.7;
  padding: 15px;
  min-width: 300px;
  min-height: 250px;
  border-radius: 5px;
}

.input {
  // z-index: 1;
  position: absolute;
  top: 10px; 
  left: 10px; 
  width: 200px;
}
</style>