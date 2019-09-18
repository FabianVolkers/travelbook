<template>
  <v-app id="app">
    <v-content>
      <v-toolbar color="primary" style="color:white">
        <v-toolbar-title>Trip Log</v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-toolbar-items v-if="$router.currentRoute.name != 'login'">
          <v-btn color="white" text @click="$router.push({name: 'home'})">Home</v-btn>
          <v-btn color="white" text @click="$router.push({name: 'friends'})">Friends</v-btn>
          <v-menu offset-y> <!--- v-if="activeUser.admin_status == 1"--->
      <template v-slot:activator="{ on }">
        <v-btn color="white" text v-on="on">
          Admin
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$router.push({name: 'users'})">
<v-list-item-title>Manage Users</v-list-item-title>
        </v-list-item> 
        <v-list-item @click="$router.push({name: 'cities'})">
<v-list-item-title>Manage Cities</v-list-item-title>
        </v-list-item>         
        
      </v-list>
    </v-menu>
    <v-menu offset-y v-if="activeUser"> <!--- v-if="activeUser.admin_status == 1"--->
      <template v-slot:activator="{ on }">
        <v-btn color="white" text v-on="on">
          user
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$router.push({name: 'settings'})">
<v-list-item-title>Settings</v-list-item-title>
        </v-list-item> 
        <v-list-item @click="logout()">
<v-list-item-title>Logout</v-list-item-title>
        </v-list-item>         
        
      </v-list>
    </v-menu>
        </v-toolbar-items>

      </v-toolbar>

      <router-view @authenticated="getUser(activeUser)" />

      <ProfileView v-if="tab == 3" v-bind:user="activeUser" />

    </v-content>
  </v-app>
</template>

<script>
  //import Login from './views/Login'
  import ProfileView from './views/ProfileView'
  //import Friends from './views/Friends'
  //import AdminPanel from './views/AdminPanel'
  import axios from 'axios'
  import VueSession from 'vue-session'
  import Vue from 'vue'
  

  Vue.use(VueSession)
  export default {
    name: 'App',
    components: {
      //Login,
      ProfileView,
      //Friends,
      //AdminPanel
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
        this.activeUser.id = ""
        if(this.$router.currentRoute.name != "login"){
          this.$router.push({
          name: "login"
        });
        }
        
      },
      checkLogin() {
        
      },

      async getUser(user) {
        this.activeUser.user_id = user.user_id
        var url = this.baseurl + "profile/user/" + this.activeUser.id

        await axios.get(url)
          .then(response => {
            this.activeUser = response.data
            this.$session.set("userObj", this.activeUser)
            return this.activeUser
          })
          .catch(e => {
            this.errors.push(e)
          })

      },

    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
          if(this.$router.currentRoute.name != "login"){
          this.$router.push({
          name: "login",
          query: { redirect: this.$router.currentRoute.name }
        });
          }
        }
    },
    mounted() {
      //this.getUser(this.getCookie("user_id"));
    },
  };
</script>