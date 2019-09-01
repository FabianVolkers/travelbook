<template>
    <v-container>
        <v-row>
        <h1>{{ username }}'s Travels!</h1>
        </v-row>
        <v-row>
            <v-col>
        <UpcomingDestinations v-bind:username="username" v-bind:destinations="destinations"/>
        </v-col>
        <v-col>
            <Map v-bind:username="username" v-bind:location="destinations[0]"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import UpcomingDestinations from './UpcomingDestinations'
import Map from './Map'


export default {
  name: 'ProfileView',
  props: {
    username: String,
  },
  components: {
      UpcomingDestinations,
      Map,
  },
  data: () => ({
      //pull destinations array from api --> only current & upcoming, onnly for this user
      destinations: [
          {name: "Madrid", lat: 40.4167754, lon: -3.7037902, date:"2019-09-01 10:00:00"},
          {name: "Berlin", lat: "52.543", lon: "23.45", date:"2019-10-01 10:00:00"},
      ]
    }),
}

</script>