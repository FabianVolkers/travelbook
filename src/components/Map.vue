<template>
    <v-row align="center">
    
    <v-card
      class="mx-auto"
      max-width= 70vw
      tile
    >
    <h2>{{ username }} is in {{ location.name }}</h2>
    <iframe 
        id="map" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0" 
        v-bind:src="'https://www.openstreetmap.org/export/embed.html?bbox=' + (location.lon-10) + '%2C' + (location.lat-10) + '%2C' + (location.lon+10) + '%2C' + (location.lat+10) + '&amp;layer=mapnik&amp;marker=' + location.lat + '%2C' + location.lon">
        </iframe>
  
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'Map',
  props: {
    username: String,
    location: Object,
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