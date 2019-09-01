<template>
    <v-row align="center">
    
    <v-card
      class="mx-auto"
      max-width= 70vw
      tile
    >
    
    <iframe 
        id="map" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0" 
        v-bind:src="iframeURL"
        ></iframe>
  
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'Map',
  props: {
    iframeURL: String
  }
}
</script>

<style scoped>
#map {
    padding: 10px 10px 10px 10px;
    width: 60vw;
    height: 40vw;
}
</style>