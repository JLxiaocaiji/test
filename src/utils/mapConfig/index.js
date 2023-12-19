import AMapLoader from '@amap/amap-jsapi-loader'

// 初始化高德地图
const initMap = async () => {
  return new Promise((resolve, reject) => {
    window._AMapSecurityConfig = {
      // securityJsCode: "04a3f510c1144e4552c019a096fb4aa5"  // 安全密钥
      // securityJsCode: "f37b8531a45506836a61ae8562a1b080" 
      securityJsCode: "783120201b461740eb6c65c6bd698282" 
    };
    AMapLoader.load({
      // key: "506904e41b2369dc460af91ae840bacb",  // 申请好的Web端开发者Key，首次调用 load 时必填
      // key: "f24919763696e406aa0e143b55a33f17", 
      key: "976ff2c71f7506540685d319be1eadbe", 
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        "AMap.Scale",
        "AMap.ToolBar",
        "AMap.ControlBar",
        "AMap.MouseTool",
        "AMap.MapType",
        "AMap.HawkEye",
        "AMap.PlaceSearch",
        "AMap.AutoComplete",
        'AMap.Driving',
        'AMap.Marker',
        'AMap.DistrictSearch',
        'AMap.CitySearch',
        'AMap.LabelMarker',
      ]
    })
    .then((AMap) => {
      resolve(AMap)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 绘制折线
 * @param path: new AMap.LngLat(116.368904,39.913423)
 * @param 其余配置项
 */
const polyline = (path) => {
    return new AMap.Polyline({
        path: path,
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: "#138DFF", // 线条颜色
        lineJoin: "round", //折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
        lineCap: "round", //折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
        zIndex: 50
    })
}

const circleMarker = (center) => {
  return new AMap.CircleMarker({
        center: center,
        radius: 5, //3D视图下，CircleMarker半径不要超过64px 大小
        strokeColor: "white", // 边框颜色
        strokeWeight: 2,
        // strokeOpacity: 0.5,
        fillColor: "#535455", // 背景色
        fillOpacity: 1, //透明度
        zIndex: 10,
        bubble: true,
        cursor: "pointer",
        clickable: false
      });
}


const mapOptions = {
    initMap,
    polyline,
    circleMarker
}
export default mapOptions