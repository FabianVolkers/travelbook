<template>
  <v-app id="app">
    <v-content>
      <v-toolbar>
        <v-toolbar-title>Trip Log</v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-toolbar-items>
          <v-btn text href="/#/home">Home</v-btn>
          <v-btn text @click="tab=1">Friends</v-btn>
          <v-btn text href="/#/admin">Admin</v-btn>
          <v-btn text @click="logout()">Logout</v-btn>
        </v-toolbar-items>

      </v-toolbar>

      <router-view @authenticated="getUser(activeUser)" />

      <ProfileView v-if="tab == 3" v-bind:user="user" />
      <Friends v-if="tab == 1" v-bind:user="user" />
      <AdminPanel v-if="tab == 2" />

    </v-content>
  </v-app>
</template>

<script>
  //import Login from './views/Login'
  import ProfileView from './views/ProfileView'
  import Friends from './views/Friends'
  import AdminPanel from './views/AdminPanel'
  import axios from 'axios'
  import VueSession from 'vue-session'
  import Vue from 'vue'

  Vue.use(VueSession)
  export default {
    name: 'App',
    components: {
      //Login,
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
      authenticated: false,
      baseurl: 'http://127.0.0.1:5345/api/v1/',
      user: {},
      tab: 0,
      activeUser: {}
    }),
    methods: {
      setAuthenticated(status) {
        this.authenticated = status;
      },
      logout() {
        this.$session.destroy();
        this.user.id = ""
        this.$router.push({
          name: "login"
        });
      },
      checkLogin() {
        
      },

      async getUser(user) {
        this.user.user_id = user.user_id
        var url = this.baseurl + "profile/user/" + this.user.id

        await axios.get(url)
          .then(response => {
            this.user = response.data
            this.$session.set("userObj", this.user)
            console.log(this.$session.getAll())
            return this.user
          })
          .catch(e => {
            this.errors.push(e)
          })

      },

    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
          this.$router.replace({
            name: "login"
          });
        } else {
          this.activeUser = this.$session.get("user")
          this.$router.push({
            name: "home"
          });
        }
    },
    mounted() {
      //this.getUser(this.getCookie("user_id"));
    },
  };
</script>