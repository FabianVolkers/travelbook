<template>
    <v-container>
        <v-row>
        <h1>Welcome Back, {{ username }}!</h1>
        </v-row>
        <v-row>
            <v-col>
        <UpcomingDestinations username="Fabian"/>
        </v-col>
        <v-col>
            <h2>{{ username }} is in {{ location.name }}</h2>
            <Map v-bind:iframeURL="'https://www.openstreetmap.org/export/embed.html?bbox=' + location.left + '%2C' + location.bottom + '%2C' + location.right + '%2C' + location.top + '&amp;layer=mapnik&amp;marker=' + location.lat + '%2C' + location.lon"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import UpcomingDestinations from './UpcomingDestinations'
import Map from './Map'


export default {
  name: 'HomeView',
  props: {
    username: String,
    iframeURL: String,
    location: Object,
  },
  components: {
      UpcomingDestinations,
      Map,
  },
  data: () => ({
    
    }),
}

</script>