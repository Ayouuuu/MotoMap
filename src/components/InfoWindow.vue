<template>
  <bm-marker :position="position" :dragging="draggin" :animation="animation" @click="infoWindowOpen"
             :icon="{url:this.url,size:{width: 32,height: 32}}">
    <bm-label :content="content" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -10, height: 30}"/>
    <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
      <a :href="link">{{ linkContent }}</a>
    </bm-info-window>
  </bm-marker>
</template>

<script>
import Config from "@/data/config.json"
export default {
  components:{
    Config
  },
  props: {
    position: {},
    animation: String,
    draggin: false,
    content: String,
    link: String,
    linkContent: String,
    url: {
      type: String,
      default: Config.icons.red
    }
  },
  data() {
    return {
      show: false

    }
  },
  methods: {
    infoWindowClose() {
      this.show = false
    },
    infoWindowOpen() {
      this.show = true
      this.$parent.center.lat = this.position.lat
      this.$parent.center.lng = this.position.lng
      this.$parent.zoom = 19
    }
  }
}
</script>

<style scoped>

</style>