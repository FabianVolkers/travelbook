<template>
  <v-app>
    <v-content>
      <v-toolbar>
      <v-toolbar-title>Travelbook</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn text @click="tab=0">Home</v-btn>
        <v-btn text @click="tab=1">Friends</v-btn>
        <v-btn  text @click="tab=2">Admin</v-btn>
      </v-toolbar-items>

    </v-toolbar>
      <ProfileView v-if="tab == 0" v-bind:user="this.user"/>
      <Friends v-if="tab == 1" v-bind:user="this.user"/>
      <AdminPanel v-if="tab == 2"/>
    </v-content>
  </v-app>
</template>

<script>
import ProfileView from './views/ProfileView'
import Friends from './views/Friends'
import AdminPanel from './views/AdminPanel'



export default {
  name: 'App',
  components: {
    ProfileView,
    Friends,
    AdminPanel
  },
  props: {
    activePage: String,
    route: Object,
  },
  data: () => ({
    //
    user: {},
    tab: 0
  }),
  
};
</script>
