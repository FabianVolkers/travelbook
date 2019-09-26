<template>
    <v-container fluid>
        <v-row id="title-row">
            <v-col cols="12" md="8" lg="8" order-md="12">
                <v-row id="image-row">
                    <v-col cols="12">
                        <v-card>
                            <v-img id="cover-photo" class="white--text"
                                v-bind:src="'https://www.happyviaggithailandia.com/app/public/upload/CAMBOGIA/Koh%20Rong%20Samloem/2.jpg'">
                            </v-img>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>Map</v-card-title>

                            <MapComponent v-if="gotFriends" v-bind:users="friends" />

                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">

                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="4" lg="4" order-md="1">
                <v-row>
                    <v-col cols="12">
                <v-card>
                    <v-card-title>Your Friends</v-card-title>
                    <v-card-text v-if="!friends[1]">You don't have any friends yet</v-card-text>
                    <v-btn style="margin-left:28%" color="primary" v-if="!friends[1]" @click="$router.push({name: 'search'})">Find Friends</v-btn>
                    <v-list>
                        <v-list-item-group v-if="friends[1]" color="primary">
                            <v-list-item two-line v-for="(friend, i) in renderArray" :key="i"
                                @click="$router.push({name: 'profile', params: {userid: friend.user_id}})">
                                <v-list-item-content>
                                    <v-row>
                                        <v-col cols="3">
                                            <v-img :src="'https://fabiserv.uber.space/travelapp/images/users/' + friend.profile_photo"
                                                class="grey lighten-2" aspect-ratio="1"
                                                style="max-height:100px; max-width:100px"></v-img>
                                        </v-col>
                                        <v-col cols="9">
                                            <v-list-item-title v-html="friend.name"></v-list-item-title>
                                            <v-list-item-subtitle
                                                v-html="'Location: ' + friend.current_location.city_name">
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle v-if="friend.destinations[0].datestring"
                                                v-html="'Next: ' + friend.destinations[0].city_name + ',  ' + friend.destinations[0].datestring">
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle v-if="!friend.destinations[0].datestring"
                                                v-html="friend.destinations[0].city_name"></v-list-item-subtitle>
                                        </v-col>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
                    </v-col>
                </v-row>
                <v-row>
                </v-row>
                <v-row>
                    <v-col cols="12">
                <v-card>
                    <v-card-title>Friend Requests</v-card-title>
                    <v-card-text v-if="!friendRequests">No pending friend requests</v-card-text>
                    <v-list v-if="friendRequests">
                        <v-list-item two-line v-for="(user, i) in friendRequests" :key="i">
                            <v-list-item-title>{{  user.user_name  }}</v-list-item-title>
                            <v-btn @click="acceptFriend(user)">Add friend</v-btn>
                        </v-list-item>
                    </v-list>
                </v-card>
                    </v-col>
                </v-row>
            </v-col>


        </v-row>

    </v-container>
</template>

<script>
    import MapComponent from '../components/Map'
    import axios from 'axios'


    export default {
        name: 'Friends',
        props: {
            user: Object,
            route: Object,
        },
        components: {
            MapComponent,
        },
        data: () => ({
            activeUser: {},
            destinations: [],
            friends: [],
            gotFriends: false,
            renderArray: [],
            baseurl: "https://fabiserv.uber.space/api/v1/",
            map: {},
            friendRequests: null,

        }),
        methods: {

            setUsers(friend) {
                //this.users = this.friends.slice()
                //this.users.unshift(this.activeUser)
            },
            async getFriends(userid) {
                
                var url = this.baseurl + "destinations/friends/user/" + userid
                await axios.get(url)
                    .then(response => {
                        console.log(response)
                        this.destinations = response.data.slice()
                        this.destinations = this.formatDateTime(this.destinations)
                        this.displayArray(this.destinations)
                        
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })

            },

            async getFriendRequests(userid) {
                var url = this.baseurl + "requests/user/" + userid
                await axios.get(url)
                    .then(response => {
                        if(response.data[0]){
                            this.friendRequests = response.data.slice()
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },

            async acceptFriend(friendship) {
                var url = this.baseurl + "friend/accept"
                await axios.post(url, friendship)
                    .then(response => {
                        var i
                        for (i in this.friendRequests){
                            if (this.friendRequests[i].friendship_id == friendship.friendship_id){
                                this.friendRequests.slice(i,1)
                                this.getFriends(this.activeUser.user_id)
                            }
                        }
                        //this.friends.push = response.data
                        //this.destinations = this.formatDateTime(this.destinations)
                        //this.displayArray(this.destinations)
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })

            },

            displayArray(destinations) {
                var now = new Date()
                var i = 0
                while (i <= destinations.length) {
                    console.log(destinations)
                    var friend = {
                        name: destinations[i].user_name,
                        user_id: destinations[i].user_id,
                        destinations: [],
                        profile_photo: destinations[i].profile_photo,
                    }

                    while (destinations[i].user_name == friend.name) {
                        var destinationDate = new Date(destinations[i].date)
                        if (destinationDate > now) {
                            friend.destinations.push(destinations[i])
                        }


                        if (destinationDate > now && !friend.current_location) {
                            friend.current_location = destinations[i - 1]
                        }

                        if (!destinations[i + 1] || destinations[i + 1].user_name != friend.name) {
                            if (destinations[i - 1].user_name != friend.name) {
                                var nextDestination = {}
                                nextDestination.city_name = "No upcoming destinations"
                                nextDestination.date = ""
                                friend.destinations.push(nextDestination)
                                if (i == destinations.length - 1) {
                                    //console.log(this.friends)
                                    this.gotFriends = true
                                }
                            }
                          //this might be wrong
                            if (destinationDate > now) {
                                this.renderArray.push(friend)
                            }
                            
                            this.friends.push(friend)
                            //console.log(this.friends)
                            this.$session.set("friends", this.friends)
                            //this.setUser(friend)
                            if (i == destinations.length - 1) {
                                this.gotFriends = true
                            }

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



        },
        mounted() {


        },
        created() {
            if (this.$session.exists()) {
                this.getSessionUser()
                console.log(this.$session.getAll())
            }
            this.getFriends(this.activeUser.user_id)
            if(this.activeUser.current_location){
                this.friends.push(this.activeUser)
            }
            
            this.getFriendRequests(this.activeUser.user_id)
            
            

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