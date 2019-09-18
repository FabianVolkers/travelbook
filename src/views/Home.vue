<template>
    <v-container fluid>
        <v-row>
            <v-col cols="0" md="1" lg="1">
            </v-col>
            <v-col cols="12" md="10" lg="10">
                <v-row id="title-row">
                    <v-col cols="12">
                        <v-card class="mx-auto" width="100%">
                            <v-img id="cover-photo" class="white--text" v-bind:src="activeUser.current_location.photo_url">
                                <v-card-title class="align-end fill-height">Welcome Back, {{ activeUser.user_name }}! Enjoy
                                    your time in {{  activeUser.current_location.city_name }}</v-card-title>
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
                                            <v-list-item-content v-if="activeUser.destinations[1]">
                                                <v-list-item-title v-html="activeUser.destinations[1].city_name">
                                                </v-list-item-title>
                                                <v-list-item-subtitle v-html="countdownString"></v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-content v-if="!activeUser.destinations[1]">
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

                                <NewDestination v-bind:activeUser="activeUser" />
                            </v-card>
                        </v-row>

                    </v-col>
                    <v-col cols="12" sm="8" xs="12" order="1" order-md="12" order-lg="12">
                        <v-card class="mx-auto">
                            <v-card-title>{{ activeUser.current_location.city_name }}
                            </v-card-title>
                            <iframe id="map" frameborder="0" marginheight="0" marginwidth="0"
                                v-bind:src="'https://www.openstreetmap.org/export/embed.html?bbox=' + (activeUser.current_location.lon-9) + '%2C' + (activeUser.current_location.lat-6) + '%2C' + (activeUser.current_location.lon+9) + '%2C' + (activeUser.current_location.lat+6) + '&amp;layer=mapnik&amp;marker=' + activeUser.current_location.lat + '%2C' + activeUser.current_location.lon">
                            </iframe>

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
    import NewDestination from './NewDestination'

    import axios from 'axios'


    export default {
        name: 'Home',
        props: {
            route: Object,
            //user: Object,
        },
        components: {
            //UpcomingDestinations,
            NewDestination
        },
        data: () => ({
            baseurl: 'http://127.0.0.1:5345/api/v1/',
            interval: "",
            countdownString: "loading countdown",
            upcoming: [],
            overlay: false,
            day: "",
            time: "",
            activeUser: {}
        }),
        /*
        computed: {
            countdownString: function () {
                // Get todays date and time
                var countdownString = "loading Countdown";
                var x = setInterval(function () {
                    var now = new Date().getTime();

                    var countdownTime = new Date(this.user.current_location.date);

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
                        countdownString = "Expired"
                    } else {
                        countdownString = days + " days " + hours + " hours " + minutes + " minutes " +
                            seconds +
                            " seconds ";
                    }
                    return countdownString
                }.bind(this), 1000)
            },
        },
        */
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
                this.upcoming = destinationsArray.slice();
                this.upcoming.shift();
                this.upcoming.shift();
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
            if (this.activeUser.destinations[1]) {
                this.countdown(this.activeUser.destinations[1].date);
                //this.displayArray(this.activeUser.destinations)
            }
        },
        mounted() {
            this.formatDateTime()
            if (this.activeUser.destinations[1]) {
                this.countdown(this.activeUser.destinations[1].date);
                this.displayArray(this.activeUser.destinations)
            }
        },
    }
</script>

<style scoped>
    #title-row {
        background-position: center;
        background-size: cover;
        height: 10vh;
    }

    #title-row h1 {
        justify-self: end;
    }

    #map {
        padding: 10px 10px 10px 10px;
        width: 100%;
        min-height: 30vh;
    }

    #cover-photo {
        height: 10vh;
    }

    @media screen and (min-width: 500px) {
        #title-row {
            height: 30vh;
        }

        #cover-photo {
            height: 30vh;
        }

        #map {
            min-height: 50vh;
        }
    }
</style>