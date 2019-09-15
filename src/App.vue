<template>
  <v-app>
    <v-content>
      <v-toolbar>
        <v-toolbar-title>Travelbook</v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-toolbar-items>
          <v-btn text @click="tab=0">Home</v-btn>
          <v-btn text @click="tab=1">Friends</v-btn>
          <v-btn text @click="tab=2">Admin</v-btn>
        </v-toolbar-items>

      </v-toolbar>
      <ProfileView v-if="tab == 0" v-bind:user="user" />
      <Friends v-if="tab == 1" v-bind:user="user" />
      <AdminPanel v-if="tab == 2" />
    </v-content>
  </v-app>
</template>

<script>
  import ProfileView from './views/ProfileView'
  import Friends from './views/Friends'
  import AdminPanel from './views/AdminPanel'
  import axios from 'axios'



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
      baseurl: 'http://127.0.0.1:5345/api/v1/',
      user: {},
      tab: 0
    }),
    methods: {

      async getUser(userID) {

        this.user.id = userID
        var url = this.baseurl + "profile/user/" + this.user.id

        await axios.get(url)
          .then(response => {
            this.user = response.data
            console.log(this.user)
            return this.user
          })
          .catch(e => {
            this.errors.push(e)
          })

      },

    },
    mounted() {
            this.getUser(this.$route.params.userid);   
        },
  };
</script>