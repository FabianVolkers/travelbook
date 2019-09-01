<template>
  <v-app>
    <v-content>
      <Toolbar/>
      <HomeView username="Fabian" v-bind:location="location"/>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import HomeView from './components/HomeView'

export default {
  name: 'App',
  components: {
    Toolbar,
    HomeView,
  },
  data: () => ({
    //
    location: {name: 'Berlin', lat: '-32.065555810864744', lon: '115.7190338134766',
            left: '88.51444244384766',
            bottom: '-44.71685554176402',
            right: '110.80936431884768',
            top: '-17.394381203596815',
            },
  }),
};
</script>
