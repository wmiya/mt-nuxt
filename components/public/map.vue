<template>
  <div :id="id"
       :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
       class="m-map" />
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default () {
        return [116.46, 39.92]
      }
    }
  },
  data () {
    return {
      id: `map`,
      key: 'a5624ffc1cb95c61fe9e6e879fb15f21',
    }
  },
  mounted () {
    let self = this
    self.id = `map${Math.random().toString().slice(4, 6)}`
    window.onmaploaded = () => {
      var map = new AMap.Map(self.id, {
        resizeEnable: true,
        center: self.point,
        zoom: 11
      });
      map.plugin(["AMap.ToolBar"], function () {
        //加载工具条
        var tool = new AMap.ToolBar();
        map.addControl(tool);
        let marker = new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      });
    }
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${self.key}&callback=onmaploaded`;
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  // watch: {
  //   point (newVal) {
  //     if (newVal) this.point = newVal
  //     this.marker.setPosition(newVal)
  //   }
  // },
}
</script>