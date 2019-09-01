<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="12">
            <v-card
    class="mx-auto"
    width="100%"
  >
    <v-img
      class="white--text"
      height="30vh"
      v-bind:src="this.user.cover_photo_path"
    >
      <v-card-title class="align-end fill-height">{{ this.user.username }}'s Travels!</v-card-title>
    </v-img>
    
  </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" sm="4" xs="12">
        <UpcomingDestinations v-bind:username="this.user.username" v-bind:destinations="destinations"/>
        </v-col>
        <v-col cols="12" sm="8" xs="12">
            <Map v-bind:username="this.user.username" v-bind:location="destinations[0]"/>
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
    user: Object,
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
          {name: "Perth", lat: -32.065555810864744, lon: 115.7190338134766, date:"2019-11-01 12:30:00"},
      ]
    }),
}

</script>

<style scoped>
    #title-row {
        background-image: url('https://c1.staticflickr.com/7/6190/6149540877_e5cfd006c2_z.jpg');
        background-position: center;
        background-size: cover;
        height: 30vh;
    }
    #title-row h1{
        justify-self: end;
    }
</style>