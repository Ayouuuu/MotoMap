<template>
  <baidu-map class="map"
             :center="center"
             :zoom="zoom"
             :scroll-wheel-zoom="true"
             @zoomend="syncCenterAndZoom"
             @moving="syncCenterAndZoom"
             @moveend="syncCenterAndZoom"
             @ready="handler"
  >
    <bm-control :offset="{width: 10, height: 40}">
      <button @click="addZoom(10)">
        <span>还原</span>
      </button>
    </bm-control>
    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <div>
      <template v-for="(data) in this.locjson">
        <info-window
            v-if="selectShow == null || selectShow === data.icon || (selectShow === 'red' && data.icon == null)"
            :content="data.content" :position="data.position"
            :animation="data.animation" :link="data.link"
            :link-content="data.linkContent" :url="ConfigJson.icons[data.icon]"/>
      </template>
    </div>
    <bm-control :offset="{width: 10, height: 80}">
      <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
        <input placeholder="请输入地名" v-model="keyword"/>
      </bm-auto-complete>
    </bm-control>
    <bm-local-search :keyword="keyword" :auto-viewport="true"/>

    <bm-control class="icons" :offset="{width:10,height: 110}">
      <button @click="setSelectShow('red')">
        <img :src="ConfigJson.icons.red" width="16" height="16" alt="red"/> <span>已经去过 {{ this.icons.red }}</span>
      </button>
      <br/>
      <button @click="setSelectShow('orange')">
        <img :src="ConfigJson.icons.orange" width="16" height="16" alt="orange"/> <span>已准备去 {{
          this.icons.orange
        }}</span>
      </button>
      <br/>
      <button @click="setSelectShow('blue')">
        <img :src="ConfigJson.icons.blue" width="16" height="16" alt="blue"/> <span>未来计划 {{
          this.icons.blue
        }}</span>
      </button>
    </bm-control>
    <bm-control anchor="BMAP_ANCHOR_BOTTOM_LEFT" :offset="{height:50}">
      <img :src="'https://visitor-badge.glitch.me/badge?page_id='+ConfigJson.title"/>
    </bm-control>
    <bm-copyright
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :copyright="[{id: 1, content: 'Copyright Message', bounds: {ne: {lng: 110, lat: 40}, sw:{lng: 0, lat: 0}}}, {id: 2, content: '<a href=https://github.com/Ayouuuu>Ayou版权所有</a>'}]">
    </bm-copyright>
  </baidu-map>
</template>

<script>
import InfoWindow from "@/components/InfoWindow";

import ConfigJson from "@/data/config.json"

export default {
  components: {
    InfoWindow
  },
  data() {
    return {
      ConfigJson,
      center: {lng: ConfigJson.center.lng, lat: ConfigJson.center.lat},
      zoom: ConfigJson.center.zoom,
      locjson: [],
      keyword: "",
      selectShow: null,
      icons: {}
      // mapStyle:{
      //   styleJson: CustomMapConfig
      // }
    }
  },
  created() {
    this.icons = {
      "red": 0,
      "blue": 0,
      "orange": 0,
    }
    this.locjson = require("@/data/loc.json")
    this.locjson.forEach((value) => {
      if (this.icons[value.icon] !== undefined) {
        this.icons[value.icon] += 1;
      } else {
        this.icons.red += 1
      }
    })
  },
  methods: {
    handler({BMap, map}) {
      this.center.lng = ConfigJson.center.lng
      this.center.lat = ConfigJson.center.lat
    },
    addZoom(level) {
      this.zoom = level
      this.center.lng = ConfigJson.center.lng
      this.center.lat = ConfigJson.center.lat
      this.keyword = ""
      this.selectShow = null
    },
    syncCenterAndZoom(e) {
      const {lng, lat} = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    setSelectShow(value) {
      if (this.selectShow === value) {
        this.selectShow = null
        return;
      }
      this.selectShow = value
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  flex: auto;
  background-color: white;
}

p {
  margin: 0;
  padding: 0;
}

input {
  margin-top: 6px;
  max-width: 100px;
}

button {
  box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
  min-width: 110px;
  min-height: 36px;
  max-width: 110px;
  margin-top: 4px;
  font-size: 4px;
}

button span {
  font-size: 10px;
}
</style>
