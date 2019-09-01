<template>
<v-container>
    <v-card
      class="mx-auto"
      tile
    >
    <v-card-title>{{ username }} is in {{ location.name }}</v-card-title>
    <iframe
        id="map" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0" 
        v-bind:src="'https://www.openstreetmap.org/export/embed.html?bbox=' + (location.lon-9) + '%2C' + (location.lat-6) + '%2C' + (location.lon+9) + '%2C' + (location.lat+6) + '&amp;layer=mapnik&amp;marker=' + location.lat + '%2C' + location.lon">
        </iframe>
  
    </v-card>
</v-container>
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
    width: 100%;
    min-height: 60vh;
}
</style>