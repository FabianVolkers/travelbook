<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="12" md="3">
                <v-form @submit.prevent="postLogin(activeUser, password)">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Email" name="email" type="email" v-model="activeUser.email" required>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Password" name="password" type="password" v-model="password" required>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="register">
                        <v-col cols="12">
                            <v-text-field label="Repeat password" name="password" type="password" v-model="password" required>
                            </v-text-field>
                        </v-col></v-row>
                    <v-row>
                        <v-col cols="5">
                            <v-btn type="submit" class="mr-4">Login</v-btn>
                        </v-col>
                        <v-col v-if="!register" cols="7">
                            <v-btn v-on:click="register = true" type="submit" class="mr-4">Register?</v-btn>
                        </v-col>
                        <v-col v-if="register" cols="7">
                            <v-btn  type="submit" class="mr-4">Create Account</v-btn>
                        </v-col>

                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    import axios from 'axios'
    import VueSession from 'vue-session'
    //import VueCookie from 'vue-cookie'
    import Vue from 'vue'

    Vue.use(VueSession)
    export default {
        name: 'Login',
        props: {},
        data: () => ({
            activeUser: {},
            password: "",
            baseurl: "http://localhost:5345/api/v1/",
            register: false,
        }),
        methods: {
            async getUser(user) {
                var url = this.baseurl + "profile/user/" + this.activeUser.user_id

                await axios.get(url)
                    .then(response => {
                        this.activeUser = response.data
                        this.$session.set("user", this.activeUser)
                        this.$session.start()
                        console.log(this.$session.getAll())
                        this.$emit("authenticated", true)
                        this.$router.replace({
                            name: "home"
                        })
                        //console.log(this.$session.getAll())
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })

            },
            postLogin(user, password) {
                if (user.email != "" && password != "") {
                    var passwordHash = require('password-hash');
                    var url = this.baseurl + 'login'
                    var authenticated
                    axios.post(url, user)
                        .then(response => {
                            if (response.data == "") {
                                console.log("this email address has no account associated with it")
                            } else {
                                authenticated = passwordHash.verify(password, response.data[0].password_hash)
                                password = "";
                                if (authenticated) {
                                    this.activeUser.user_id = response.data[0].user_id
                                    this.getUser(this.activeUser.user_id)

                                } else {
                                    console.log("invalid password")
                                }
                            }

                        })
                        .catch(e => {
                            this.errors.push(e)
                        })
                } else {

                }

            },
            /*
            setPassword(password) {
                var passwordHash = require('password-hash');
                var hashedPassword = passwordHash.generate(password);
            }
            */
        }
    }
</script>