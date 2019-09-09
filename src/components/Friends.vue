<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="12">
                <v-card>
                <v-card-title>{{ user.name }}'s Friends</v-card-title>
                <v-list>
                    <v-list-item-group color="primary">
                        <v-list-item two-line v-for="(friend, i) in friends" :key="i">
                            <v-list-item-content v-if="friend.friend_id1 == user.id">
                                <v-list-item-title v-html="friend.friend_name2"></v-list-item-title>
                                <v-list-item-subtitle v-html="friend.friend_id2"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-content v-if="friend.friend_id2 == user.id">
                                <v-list-item-title v-html="friend.friend_name1"></v-list-item-title>
                                <v-list-item-subtitle v-html="friend.friend_id1"></v-list-item-subtitle>
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
            user: Object
        },
        data: () =>({
            friends: [],
        }),
        methods: {
            getFriends() {
                var userid = 2
                var baseurl = 'http://localhost:5345/'

                var url = baseurl + "friends/user/" + userid
                var result = {}
                axios.get(url)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.friends = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        },
            beforeMount(){
                this.getFriends()
            }
        }
</script>