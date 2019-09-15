<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="4">
                <v-card>
                    <v-card-title>{{ user.user_name }}'s Friends</v-card-title>
                    <v-list>
                        <v-list-item-group color="primary">
                            <v-list-item two-line v-for="(friend, i) in renderArray" :key="i">
                                <v-list-item-content>
                                    <v-row>
                                        <v-col cols="3">
                                    <v-img :src="'http://www.goga.gy/sites/default/files/default_images/placeholder.png'" class="grey lighten-2" aspect-ratio="1" style="max-height:100px; max-width:100px"></v-img>
                                        </v-col>
                                        <v-col cols="9">
                                    <v-list-item-title v-html="friend.name"></v-list-item-title>
                                    <v-list-item-subtitle v-html="'Location: ' + friend.destinations[0].city_name"></v-list-item-subtitle>
                                    <v-list-item-subtitle v-if="friend.destinations[1].datestring" v-html="'Next: ' + friend.destinations[1].city_name + '  ' + friend.destinations[1].datestring"></v-list-item-subtitle>
                                     <v-list-item-subtitle v-if="!friend.destinations[1].datestring" v-html="friend.destinations[1].city_name"></v-list-item-subtitle>
                                    <v-btn :href="'/%23/friends/user/' + friend.user_id">Profile</v-btn>
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
    

    export default {
        name: 'Friends',
        props: {
            user: Object,
            route: Object,
        },
        data: () => ({
            destinations: [],
            renderArray: [],
            baseurl: "http://localhost:5345/api/v1/"
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
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
                    
            },
            displayArray(destinations){
                
                
                var i = 0
                var j = 0
                while (i <= destinations.length){
                    var friend = {}
                    friend.destinations = []
                    friend.name = destinations[i].user_name
                    friend.user_id = destinations[i].user_id
                    while(destinations[i].user_name == friend.name){
                        
                        friend.destinations.push(destinations[i])
                        //console.log(friend)
                        //console.log(JSON.stringify(friend.destinations))
                        if ( !destinations[i + 1] || destinations[i + 1].user_name != friend.name) {
                            if (destinations[i - 1].user_name != friend.name){
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
            }
        },
        beforeMount() {
            //this.getUser(this.$route.params.userid)
            this.getFriends(this.user.user_id)
        }
    }
</script>