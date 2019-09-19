<template>
    <v-container fluid>
        <v-row id="title-row">
            <v-col cols="12" md="8" lg="8" order-md="12">
                <v-row id="image-row">
                    <v-col cols="12">
                        <v-card>
                            <v-img id="cover-photo" class="white--text" v-bind:src="'https://www.happyviaggithailandia.com/app/public/upload/CAMBOGIA/Koh%20Rong%20Samloem/2.jpg'"></v-img>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>Map</v-card-title>
                            <div id="map" class="map"></div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">

                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="4" lg="4" order-md="1">
                <v-card>
                    <v-card-title>{{ activeUser.user_name }}'s Friends</v-card-title>
                    <v-list>
                        <v-list-item-group color="primary">
                            <v-list-item two-line v-for="(friend, i) in renderArray" :key="i">
                                <v-list-item-content>
                                    <v-row>
                                        <v-col cols="3">
                                            <v-img
                                                :src="'http://www.goga.gy/sites/default/files/default_images/placeholder.png'"
                                                class="grey lighten-2" aspect-ratio="1"
                                                style="max-height:100px; max-width:100px"></v-img>
                                        </v-col>
                                        <v-col cols="9">
                                            <v-list-item-title v-html="friend.name"></v-list-item-title>
                                            <v-list-item-subtitle
                                                v-html="'Location: ' + friend.destinations[0].city_name">
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle v-if="friend.destinations[1].datestring"
                                                v-html="'Next: ' + friend.destinations[1].city_name + '  ' + friend.destinations[1].datestring">
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle v-if="!friend.destinations[1].datestring"
                                                v-html="friend.destinations[1].city_name"></v-list-item-subtitle>
                                            <v-btn :href="'/#/profile/user/' + friend.user_id">Profile</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>

            
        </v-row>

    </v-container>
</template>

<script>
    import axios from 'axios'
    import 'ol/ol.css';
    import Map from 'ol/Map';
    import View from 'ol/View';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM.js';
    import {
        fromLonLat
    } from 'ol/proj.js';
    import Feature from 'ol/Feature';
    import Polygon from 'ol/geom/Polygon';
    import Point from 'ol/geom/Point';


    export default {
        name: 'Friends',
        props: {
            user: Object,
            route: Object,
        },
        data: () => ({
            activeUser: {},
            destinations: [],
            friends: [],
            renderArray: [],
            baseurl: "http://localhost:5345/api/v1/",

        }),
        methods: {
            getFriends(userid) {
                var url = this.baseurl + "destinations/friends/user/" + userid
                axios.get(url)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.destinations = response.data
                        this.destinations = this.formatDateTime(this.destinations)
                        this.displayArray(this.destinations)
                        //this.calculateDistances()
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })

            },
            loadMap() {
                

                new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                            preload: 4,
                            source: new OSM()
                        }),
    
                    ],
                    view: new View({
                        center: [0, 0],
                        zoom: 2,
                        //projection: mercator,
                    })
                });
            }


            ,
            displayArray(destinations) {


                var i = 0
                while (i <= destinations.length) {
                    var friend = {}
                    friend.name = destinations[i].user_name
                    friend.user_id = destinations[i].user_id
                    this.friends.push(friend)
                    friend.destinations = []
                    while (destinations[i].user_name == friend.name) {
                        friend.destinations.push(destinations[i])
                        if (!destinations[i + 1] || destinations[i + 1].user_name != friend.name) {
                            if (destinations[i - 1].user_name != friend.name) {
                                var nextDestination = {}
                                nextDestination.city_name = "No upcoming destinations"
                                nextDestination.date = ""
                                friend.destinations.push(nextDestination)
                            }
                            this.renderArray.push(friend)
                            this.$session.set("friends", this.friends)
                            console.log(this.$session.getAll())
                        }
                        i++;
                    }   
                
                }
                

            },
            formatDateTime(destinations) {
                var i = 0
                for (i in destinations) {
                    var date = new Date(destinations[i].date)
                    destinations[i].dateFormat = date.getUTCFullYear() + "-" + this.addZero((date
                        .getMonth()) + 1) + "-" + this.addZero(date.getDate())
                    destinations[i].datestring = date.toDateString();
                    destinations[i].time = this.addZero(date.getHours()) + ":" + this.addZero(date
                        .getMinutes())
                    i = i + 1
                }
                return destinations

            },

            addZero(i) {
                if (i < 10) {
                    i = "0" + i
                }
                return i;
            },
            distancesView() {
                var now = new Date();
                var i = 0;
                for (i in this.labels) {
                    this.labels[i] = now.getDate() + "." + now.getMonth() + "."
                    now.setDate(now.getDate() + 7);
                }
            },
            /*
            calculateDistances() {
                console.log("Calculating Distances")
                this.friends = this.renderArray
                this.friends.distances = [];
                var i = 0;
                var j = 0
                var k = 0;
                for (k in this.friends) {
                    for (j in this.friends[k].destinations) {
                        for (i in this.labels) {
                            var destinationDate = new Date(this.friends[k].destinations[j].date)
                            if (i == 0) {
                                this.friends[k].distances.push(destinationDate)
                            } else {
                                var labelDate = new Date(this.labels[i])
                                if (labelDate <= destinationDate) {
                                    this.friends[k].distances.push(this.getDistance(this.friends.destinations[j].lat,
                                        this.friends.destinations[j].lon))
                                } else {
                                    this.friends[k].distances.push(this.friends[k - 1].distances[i])
                                }
                            }

                        }
                    }
                    console.log(friends[k].distances)
                }
                console.log(this.friends)


            },
            getDistance(lat, lon) {
                var distance = Math.sqrt(Math.pow(Number(lat) - Number(this.activeUser.current_location.lat), 2) * Math.pow(
                    Number(lon) - Number(this.activeUser.current_location.lon), 2))
                return distance;
            },
            */
            getSessionUser() {
                this.activeUser = this.$session.get("user")
            }
            /*
                        calculateDistances(friends) {
                            friends.distances = []
                            for(i in friends.destinations){
                                for(j in friends[i].destinations){
                                    friends[i].distances.push(Math.sqrt(Math.pow(Number(friends[i].destinations[j].lat) - Number(this.activeUser.current_location.lat), 2) * Math.pow(Number(friends[i].destinations[j].lon) - Number(this.activeUser.current_location.lon) , 2)))
                                }
                                console.log(friends[i].distances)
                            }
                            return friends
                        }
            */
        },
        beforeCreate: function () {

            if (!this.$session.exists()) {
                if (this.$router.currentRoute.name != "login") {
                    this.$router.push({
                        name: "login",
                        query: {
                            redirect: this.$router.currentRoute.name
                        }
                    });
                }
            }
        },

        beforeMount() {
            //this.getUser(this.$route.params.userid)
            this.getFriends(this.activeUser.user_id)


        },
        mounted() {
            this.loadMap()
        },
        created() {
            if (this.$session.exists()) {
                this.getSessionUser()
            }

            //this.distancesView()
        }
    }
</script>
<style>
    #map {
        width: 100%;
        height: 100%;
    }
    #cover-photo {
        height: 18vh;
    }
</style>