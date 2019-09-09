<template>
  <v-app>
    <v-content>
      <v-toolbar>
      <v-toolbar-title>Travelbook</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn text @click="tab=0">Home</v-btn>
        <v-btn text @click="tab=1">Friends</v-btn>
        <v-btn text @click="tab=2">Travel Guides</v-btn>
      </v-toolbar-items>

    </v-toolbar>
      <ProfileView v-if="tab == 0" v-bind:user="this.user"/>
      <Friends v-if="tab == 1" v-bind:user="this.user"/>
    </v-content>
  </v-app>
</template>

<script>
import ProfileView from './components/ProfileView'
import Friends from './components/Friends'

export default {
  name: 'App',
  components: {
    ProfileView,
    Friends,
  },
  props: {
    activePage: String
  },
  data: () => ({
    //
    user: {
      id: "1",
      name: "Fabian",
      profile_picture_path: "",
      cover_photo_path: "https://c1.staticflickr.com/7/6190/6149540877_e5cfd006c2_z.jpg",

    },
    tab: 0
  }),

};
</script>
