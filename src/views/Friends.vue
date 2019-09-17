<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="12" md="4" lg="4">
                <v-card>
                    <v-card-title>{{ user.user_name }}'s Friends</v-card-title>
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
                                            <v-btn :href="'/%23/friends/user/' + friend.user_id">Profile</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>

            <v-col cols="12" md="8" lg="8">
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>Map</v-card-title>
                            <div id="map"></div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card class="mt-4 mx-auto" max-width="100%">
                            <v-sheet class="v-sheet--offset mx-auto" color="none" elevation="12"
                                max-width="calc(100% - 32px)">
                                <v-sparkline v-for="(friend, i) in friends" :key="i" :labels="labels" radius="10"
                                    :value="friend.distances" color="black" line-width="2" padding="16">
                                </v-sparkline>
                                <v-sparkline :labels="labels" :value="value" style="position:absolute" :smooth="10"
                                    color="black" line-width="0.5" padding="16">
                                </v-sparkline>
                                <v-sparkline :value="value2" style="position:absolute" color="cyan" :smooth="10"
                                    line-width="0.5" padding="16">
                                </v-sparkline>
                            </v-sheet>

                            <v-card-text class="pt-0">
                                <div class="title font-weight-light mb-2">Distance Plot</div>
                            </v-card-text>
                        </v-card>

                    </v-col>
                </v-row>
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
    import XYZ from 'ol/source/XYZ';

    new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new XYZ({
                    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                })
            })
        ],
        view: new View({
            center: [0, 0],
            zoom: 2
        })
    });

    export default {
        name: 'Friends',
        props: {
            user: Object,
            route: Object,
        },
        data: () => ({
            destinations: [],
            friends: [],
            renderArray: [],
            baseurl: "http://localhost:5345/api/v1/",
            labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
            value: [
                200,
                675,
                410,
                390,
                310,
                460,
                250,
                240,
            ],
            value2: [
                400,
                375,
                610,
                190,
                135,
                540,
            ],
            colours: [
                "red",
                "cyan",
                "",
                "",
            ]
        }),
        methods: {
            getFriends(userid) {
                var url = this.baseurl + "friends/user/" + userid
                var result = {}
                axios.get(url)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.destinations = response.data
                        //console.log(this.friends)
                        this.destinations = this.formatDateTime(this.destinations)
                        this.displayArray(this.destinations)
                        this.calculateDistances()

                    })
                    .catch(e => {
                        this.errors.push(e)
                    })

            },
            displayArray(destinations) {


                var i = 0
                var j = 0
                while (i <= destinations.length) {
                    var friend = {}
                    friend.destinations = []
                    friend.name = destinations[i].user_name
                    friend.user_id = destinations[i].user_id
                    while (destinations[i].user_name == friend.name) {

                        friend.destinations.push(destinations[i])
                        //console.log(friend)
                        //console.log(JSON.stringify(friend.destinations))
                        if (!destinations[i + 1] || destinations[i + 1].user_name != friend.name) {
                            if (destinations[i - 1].user_name != friend.name) {
                                var nextDestination = {}
                                nextDestination.city_name = "No upcoming destinations"
                                nextDestination.date = ""
                                friend.destinations.push(nextDestination)

                            }
                            console.log(friend)
                            this.renderArray.push(friend)
                            console.log(this.renderArray)
                        }
                        j++;
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
                var distance = Math.sqrt(Math.pow(Number(lat) - Number(this.user.current_location.lat), 2) * Math.pow(
                    Number(lon) - Number(this.user.current_location.lon), 2))
                return distance;
            }
            /*
                        calculateDistances(friends) {
                            friends.distances = []
                            for(i in friends.destinations){
                                for(j in friends[i].destinations){
                                    friends[i].distances.push(Math.sqrt(Math.pow(Number(friends[i].destinations[j].lat) - Number(this.user.current_location.lat), 2) * Math.pow(Number(friends[i].destinations[j].lon) - Number(this.user.current_location.lon) , 2)))
                                }
                                console.log(friends[i].distances)
                            }
                            return friends
                        }
            */
        },
        beforeMount() {
            //this.getUser(this.$route.params.userid)
            this.getFriends(this.user.user_id)


        },
        created() {
            this.distancesView()
        }
    }
</script>
<style>
    #map {
        width: 100%;
        height: 100%;
    }
</style>