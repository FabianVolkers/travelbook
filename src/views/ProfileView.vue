<template>
    <v-container fluid>
        <v-row>
            <v-col cols="0" md="1" lg="1">
            </v-col>
            <v-col cols="12" md="10" lg="10">
                <v-row id="title-row" no-gutters>
                    <v-col cols="12">
                        <v-card class="mx-auto" width="100%">
                            <v-img id="cover-photo" class="white--text" v-bind:src="user.current_location.photo_url">
                                <v-card-title class="align-end fill-height">{{ user.user_name }}'s Travels!
                                </v-card-title>
                            </v-img>

                        </v-card>
                    </v-col>
                </v-row>
                <v-row v-if="friendship">
                    <v-col cols="12" sm="4" xs="12" order="12" order-md="1" order-lg="1">
                        <!--<UpcomingDestinations v-bind:user="this.user" v-bind:destinations="destinations" />-->

                        <v-row align="center">

                            <v-card class="mx-auto" tile>
                                <v-card-title>{{ user.user_name }}'s Upcoming Destinations</v-card-title>
                                <v-list>
                                    <v-list-item-group color="primary">
                                        <v-list-item>
                                            <v-list-item-content v-if="user.destinations[1]">
                                                <v-list-item-title v-html="user.destinations[1].city_name">
                                                </v-list-item-title>
                                                <v-list-item-subtitle v-html="countdownString"></v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-content v-if="!user.destinations[1]">
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

                            </v-card>
                        </v-row>

                    </v-col>
                    <v-col cols="12" sm="8" xs="12" order="1" order-md="12" order-lg="12">
                        <v-card class="mx-auto">
                            <v-card-title>{{ user.user_name }} is in {{ user.current_location.city_name }}
                            </v-card-title>
                            <iframe id="map" frameborder="0" marginheight="0" marginwidth="0"
                                v-bind:src="'https://www.openstreetmap.org/export/embed.html?bbox=' + (user.current_location.lon-9) + '%2C' + (user.current_location.lat-6) + '%2C' + (user.current_location.lon+9) + '%2C' + (user.current_location.lat+6) + '&amp;layer=mapnik&amp;marker=' + user.current_location.lat + '%2C' + user.current_location.lon">
                            </iframe>

                        </v-card>
                    </v-col>
                </v-row>
                <v-row v-if="!friendship">
                    <v-col cols="0" md="2"></v-col>
                    <v-col cols="12" md="8">
                        <v-card id="no-friendship">
                            <v-icon large>mdi-lock-outline</v-icon>
                            <v-card-text>{{  user.user_name  }}'s profile is set to private.</v-card-text>
                            <v-btn color="secondary">Send Friend Request</v-btn>
                        </v-card>
                    </v-col>
                    <v-col cols="0" md="2"></v-col>
                </v-row>
            </v-col>
            <v-col cols="0" md="1" lg="1">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ProfileView',
        props: {
            route: Object,
            //user: Object,
        },
        components: {},
        data: () => ({
            baseurl: 'http://127.0.0.1:5345/api/v1/',
            interval: "",
            activeUser: {},
            user: {
                current_location: {
                    photo_url: "",
                },
            },
            friendship: false,
            countdownString: "loading countdown",
            upcoming: [],
            day: "",
            time: "",
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

            checkFriendship(profileID) {
                //user_id == route.params.userid
                var i = 0
                for( i in this.friends ){
                    if (this.friends[i].id == profileID){
                        this.friendship = true
                    }
                }
            },

            async getFriends(activeID, profileID) {
                //userid == activeUser.user_id
                var url = this.baseurl + "friends/user/" + activeID
                await axios.get(url)
                    .then(response => {
                        this.friends = response.data
                        //this.$session.set("friends", friends)
                        this.checkFriendship(profileID)
                        if(this.friendship){
                            if (this.user.destinations.length > 1) {
                            this.countdown(this.user.destinations[1].date);
                            this.displayArray(this.user.destinations)
                        }
                        
            }
                        //this.calculateDistances()

                    })
                    .catch(e => {
                        this.errors.push(e)
                    })

            },

            async getUser(profileID) {
                //userID == route.params.userid
                var url = this.baseurl + "profile/user/" + profileID

                await axios.get(url)
                    .then(response => {
                        this.user = response.data
                        if (this.$session.exists()) {
                            this.getSessionUser()
                            //this.friends = this.$session.get("friends")
                            this.getFriends(this.activeUser.user_id, profileID)
                            
                        }

                        if (this.user.destinations[1]) {
                            this.countdown(this.user.destinations[1].date);
                            //this.displayArray(this.user.destinations)
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })

            },

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
                for (i in this.user.destinations) {
                    var date = new Date(this.user.destinations[i].date)
                    this.user.destinations[i].dateFormat = date.getUTCFullYear() + "-" + this.addZero((date
                        .getMonth()) + 1) + "-" + this.addZero(date.getDate())
                    this.user.destinations[i].datestring = date.toDateString();
                    this.user.destinations[i].time = this.addZero(date.getHours()) + ":" + this.addZero(date
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
            },

        },
        beforeCreate: function () {
            if (!this.$session.exists()) {
                if (this.$router.currentRoute.name != "login") {
                    this.$router.push({
                        name: "login",
                        query: {
                            redirect: this.$route.name,
                            user_id: this.$route.params.userid
                        }
                    });
                }
            }
        },
        beforeMount() {
           
        },
        created() {
            
        },
        mounted() {
            this.getUser(this.$route.params.userid)
            this.formatDateTime()
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

    #no-friendship {
        height: 55vh;
        text-align: center;
        padding-top: 18vh;
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