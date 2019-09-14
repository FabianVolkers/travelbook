<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters v-if="gotData">
            <v-col cols="12">
                <v-card class="mx-auto" width="100%">
                    <v-img id="cover-photo" class="white--text" v-bind:src="user.cover_photo_path">
                        <v-card-title class="align-end fill-height">{{ user.name }}'s Travels!</v-card-title>
                    </v-img>

                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="4" xs="12" order="12" order-md="1" order-lg="1">
                <!--<UpcomingDestinations v-bind:user="this.user" v-bind:destinations="destinations" />-->
                
                <v-row align="center">

                    <v-card class="mx-auto" tile>
                      <v-card-title>{{ user.name }}'s Upcoming Destinations</v-card-title>
                        <v-list>
                          <v-list-item-group color="primary">
                                 <v-list-item>
                                    <v-list-item-content v-if="destinations[1]">
                                        <v-list-item-title v-html="destinations[1].location"></v-list-item-title>
                                        <v-list-item-subtitle v-html="countdownString"></v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-content v-if="!destinations[1]">
                                        <v-list-item-title>No upcoming destinations</v-list-item-title>
                                        <v-list-item-subtitle></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                             <v-list-item-group v-if="upcoming" color="primary">
                                <v-list-item two-line v-for="(destination, i) in upcoming" :key="i">
                                    <v-list-item-content>
                                        <v-list-item-title v-html="destination.location"></v-list-item-title>
                                        <v-list-item-subtitle v-html="destination.datestring"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>

                        <NewDestination v-bind:destinations="destinations" v-bind:user="user" />
                    </v-card>
                </v-row>

            </v-col>
            <v-col cols="12" sm="8" xs="12" order="1" order-md="12" order-lg="12">
                <v-card class="mx-auto">
                    <v-card-title>{{ user.name }} is in {{ user.current_location }}</v-card-title>
                    <iframe id="map" frameborder="0" marginheight="0" marginwidth="0"
                        v-bind:src="'https://www.openstreetmap.org/export/embed.html?bbox=' + (this.user.lon-9) + '%2C' + (this.user.lat-6) + '%2C' + (this.user.lon+9) + '%2C' + (this.user.lat+6) + '&amp;layer=mapnik&amp;marker=' + this.user.lat + '%2C' + this.user.lon">
                    </iframe>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    //import UpcomingDestinations from '../components/UpcomingDestinations'
    import NewDestination from '../views/NewDestination'

    import axios from 'axios'


    export default {
        //name: 'ProfileView',
        props: {
            route: Object,
        },
        components: {
            //UpcomingDestinations,
            NewDestination
        },
        data: () => ({
            destinations: [],
            user: {},
            baseurl: 'https://fabiserv.uber.space/api/v1/',
            interval: "",
            countdownString: "",
            upcoming: [],
            edit: false,
            overlay: false,
            day: "",
            time: "",
            gotData: false,
        }),
        methods: {
            async getUser(userID) {

                this.user.id = userID
                var url = this.baseurl + "user/" + this.user.id

                await axios.get(url)
                    .then(response => {
                        // JSON responses are automatically parsed
                        this.user.name = response.data[0].name
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
                //this.user.name = this.$route.params.username
                this.user.profile_picture_path = ""
            },
            async getDestinations() {
                var url = this.baseurl + "destinations/user/" + this.user.id
                await axios.get(url)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.destinations = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
                    this.formatDateTime();
                    if(this.destinations[1]){
                        this.displayArray(this.destinations);
                        this.countdown(this.destinations[1].date);
                    }
                    this.getCurrentLocation(this.destinations[0].location);
            },

            getCurrentLocation(name) {
                var url = this.baseurl + "city/" + name
                axios.get(url)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.user.lat = response.data[0].lat
                        this.user.lon = response.data[0].lon
                        this.user.cover_photo_path = response.data[0].photo_url
                        this.user.current_location = response.data[0].name
                        console.log(response.data)
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
                    this.gotData = true
                    this.$forceUpdate
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
                    //console.log(this.countdownString);
                }.bind(this), 1000)
            },
            displayArray: function (destinationsArray) {
                this.upcoming = destinationsArray.slice();
                this.upcoming.shift();
                this.upcoming.shift();
            },
            formatDateTime() {
                var i = 0
                for (i in this.destinations) {
                    var date = new Date(this.destinations[i].date)
                    this.destinations[i].dateFormat = date.getUTCFullYear() + "-" + this.addZero((date.getMonth())+1) + "-" + this.addZero(date.getDate())
                    this.destinations[i].datestring = date.toDateString();
                    this.destinations[i].time = this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes())
                    i = i + 1
                }

            },
            addZero(i) {
                if (i < 10) {
                    i = "0" + i
                }
                return i;
            }


        },
        beforeMount() {
            this.getUser(this.$route.params.userid);
            this.getDestinations();           
            if(this.destinations[1]){
                this.countdown(this.destinations[1].date);
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