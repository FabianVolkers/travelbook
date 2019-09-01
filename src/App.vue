<template>
  <v-app>
    <v-content>
      <Toolbar/>
      <ProfileView v-bind:user="this.user"/>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import ProfileView from './components/ProfileView'

export default {
  name: 'App',
  components: {
    Toolbar,
    ProfileView,
  },
  data: () => ({
    //
    user: {
      id: "1",
      username: "Fabian",
      profile_picture_path: "",
      cover_photo_path: "https://c1.staticflickr.com/7/6190/6149540877_e5cfd006c2_z.jpg",

    }
  }),
};
</script>
