<template>
  <div ref="app" id="app" v-title data-title="MotoMap">
    <moto-map/>
  </div>
</template>

<script>
import MotoMap from "@/components/MotoMap";
import Config from "@/data/config.json"

export default {
  name: 'App',
  components:{
    MotoMap
  },
  mounted() {
    document.title = Config.title
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app{
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
}
</style>
