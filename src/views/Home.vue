<template>
    <v-container fluid>
        <v-row>
            <v-col cols="0" md="1" lg="1">
            </v-col>
            <v-col cols="12" md="10" lg="10">
                <v-row id="title-row" no-gutters>
                    <v-col cols="12">
                        <v-card class="mx-auto" width="100%" v-if="activeUser.current_location">
                            <v-img id="cover-user" class="white--text banner-photo" v-bind:src="activeUser.current_location.photo_url">
                                <v-card-title class="align-end fill-height">Welcome Back, {{ activeUser.user_name }}! Enjoy
                                    your time in {{  activeUser.current_location.city_name }}</v-card-title>
                            </v-img>
                        </v-card>
                        <v-card class="mx-auto" width="100%" v-if="!activeUser.current_location">
                            <v-img id="cover-placeholder" class="white--text banner-photo" v-bind:src="bannerPlaceholder">
                                <v-card-title class="align-end fill-height">Welcome, {{ activeUser.user_name }}!</v-card-title>
                            </v-img>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="4" xs="12" order="12" order-md="1" order-lg="1">
                        <!--<UpcomingDestinations v-bind:user="this.user" v-bind:destinations="destinations" />-->

                        <v-row align="center">

                            <v-card class="mx-auto" tile>
                                <v-card-title>Your Upcoming Destinations</v-card-title>
                                <v-list>
                                    <v-list-item-group color="primary">
                                        <v-list-item>
                                            <v-list-item-content v-if="activeUser.nextDestination">
                                                <v-list-item-title v-html="activeUser.nextDestination.city_name">
                                                </v-list-item-title>
                                                <v-list-item-subtitle v-html="countdownString"></v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-content v-if="!upcoming">
                                                <v-list-item-title>No upcoming destinations</v-list-item-title>
                                                <v-list-item-subtitle></v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                    <v-list-item-group v-if="upcoming" color="primary">
                                        <v-list-item two-line v-for="(destination, i) in upcoming" :key="i">
                                            <v-list-item-content>
                                                <v-list-item-title v-html="destination.city_name"></v-list-item-title>
                                                <v-list-item-subtitle v-html="destination.datestring">
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                                <v-btn class="mr-4" @click="$router.push({name: 'destinations'})">Edit Destinations</v-btn>
                               </v-card>
                        </v-row>

                    </v-col>
                    <v-col cols="12" sm="8" xs="12" order="1" order-md="12" order-lg="12">
                        <v-card class="mx-auto">
                            <v-card-title v-if="activeUser.current_location">{{ activeUser.current_location.city_name }}
                            </v-card-title>
                            <!--
                            <iframe id="map" frameborder="0" marginheight="0" marginwidth="0"
                                v-bind:src="'https://www.openstreetmap.org/export/embed.html?bbox=' + (activeUser.current_location.lon-9) + '%2C' + (activeUser.current_location.lat-6) + '%2C' + (activeUser.current_location.lon+9) + '%2C' + (activeUser.current_location.lat+6) + '&amp;layer=mapnik&amp;marker=' + activeUser.current_location.lat + '%2C' + activeUser.current_location.lon">
                            </iframe>
-->
                            <MapComponent v-bind:users="users"/>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="0" md="1" lg="1">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    //import UpcomingDestinations from '../components/UpcomingDestinations'
    import MapComponent from '../components/Map'

    import axios from 'axios'

    export default {
        name: 'Home',
        props: {
            route: Object,
            //user: Object,
        },
        components: {
            //UpcomingDestinations,
            
            MapComponent
        },
        data: () => ({
            baseurl: 'https://fabiserv.uber.space/api/v1/',
            interval: "",
            countdownString: "loading countdown",
            upcoming: null,
            overlay: false,
            day: "",
            time: "",
            activeUser: {},
            users: [],
            bannerPlaceholder: 'https://s3.amazonaws.com/zweb-s3.uploads/ez2/wp-content/uploads/2018/01/iStock-534661459-copy.jpg'
        }),

        methods: {
            
            countdown: function (timestamp) {
                // Get todays date and time
                var x = setInterval(function () {
                    var now = new Date().getTime();

                    var countdownTime = new Date(timestamp);

                    // Find the distance between now and the count down date
                    var distance = countdownTime - now;

                    // Time calculations for days, hours, minutes and seconds
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    // return countdown string
                    //var countdownString
                    if (distance < 0) {
                        this.countdownString = "Expired"
                    } else {
                        this.countdownString = days + " days " + hours + " hours " + minutes + " minutes " +
                            seconds +
                            " seconds ";
                    }
                }.bind(this), 1000)
            },

            displayArray: function (destinationsArray) {
                var i = 0
                var now = new Date()
                
                for (i in destinationsArray) {
                    var date = new Date(destinationsArray[i].date)
                    if(date > now && !this.upcoming){
                        this.activeUser.nextDestination = destinationsArray[i]
                        this.upcoming = destinationsArray.slice(Number(i) + 1)
                        this.countdown(this.activeUser.nextDestination.date)                        
                    }
                }
                ;
                //this.upcoming.shift();
                //this.upcoming.shift();
            },
            formatDateTime() {
                var i = 0
                for (i in this.activeUser.destinations) {
                    var date = new Date(this.activeUser.destinations[i].date)
                    this.activeUser.destinations[i].dateFormat = date.getUTCFullYear() + "-" + this.addZero((date
                        .getMonth()) + 1) + "-" + this.addZero(date.getDate())
                    this.activeUser.destinations[i].datestring = date.toDateString();
                    this.activeUser.destinations[i].time = this.addZero(date.getHours()) + ":" + this.addZero(date
                        .getMinutes())
                    i = i + 1
                }

            },
            addZero(i) {
                if (i < 10) {
                    i = "0" + i
                }
                return i;
            },
            getSessionUser() {
                this.activeUser = this.$session.get("user")
                this.users.push(this.activeUser)
            }
            

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
        created() {
            if(this.$session.exists()){
                this.getSessionUser()
                
            }
            
        },
        mounted() {
            this.formatDateTime()
            if (this.activeUser.destinations) {
                this.$session.set("user", this.activeUser)
                if (this.activeUser.destinations[1]){
                    this.displayArray(this.activeUser.destinations)
                }
                
            }
        },
    }
</script>

<style scoped>
    #title-row {
        background-position: center;
        background-size: cover;
        height: 30vh;
    }

    #title-row h1 {
        justify-self: end;
    }

    #map {
        width: 100%;
        height: 100%;
    }

    .banner-photo {
        height: 30vh;
    }

    @media screen and (max-width: 500px) {
        .banner-photo {
        height: 15vh;
    }

#title-row {
        height: 15vh;
    }

        #map {
            min-height: 50vh;
        }
    }
</style>