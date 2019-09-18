<template>
    <v-container fluid id="login-container">
        <v-row id="top-row" no-gutters>
            <v-col cols="12">
                <h1></h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="0" md="4">
            </v-col>
            <v-col cols="12" md="4" style="justify:center">
                <v-card class="mx-auto">
                    <v-card-title style="text-align:center">Welcome to Travel Log</v-card-title>
                    <v-card-text>Please sign in to continue</v-card-text>
                    <v-form @submit.prevent="postLogin(activeUser, password)"
                        style="padding-left:18px; padding-right:18px">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field :rules="[rules.required, rules.email]" label="Email" name="email"
                                    type="email" v-model="activeUser.email" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field :rules="[rules.required]" label="New Password" name="password" v-model="password" required
                                    :append-icon="e1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="() => (e1 = !e1)"
                                    :type="e1 ? 'text' : 'password'">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="register">
                            <v-col cols="12">
                                <v-text-field label="Repeat password" name="passwordRepeat" v-model="passwordRepeat"
                                    required :append-icon="e2 ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append="() => (e2 = !e2)" :type="e2 ? 'text' : 'password'">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="1">
                            </v-col>
                            <v-col cols="4">
                                <v-btn type="submit" class="mr-4">Login</v-btn>
                            </v-col>
                            <v-col cols="1" md="1">
                            </v-col>
                            <v-col v-if="!register" cols="6">
                                <v-btn v-on:click="register = true" type="submit" class="mr-4">Register?</v-btn>
                            </v-col>
                            <v-col v-if="register" cols="6">
                                <v-btn v-on:click="registerUser()" class="mr-4">Create Account</v-btn>
                            </v-col>

                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
            <v-col cols="0" md="5">
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    import axios from 'axios'
    import {
        mdiEye
    } from '@mdi/js';
    import {
        mdiEyeOff
    } from '@mdi/js';


    export default {
        name: 'Login',
        props: {},
        data: () => ({
            e1: false,
            e2: false,
            activeUser: {},
            password: "",
            passwordRepeat: "",
            baseurl: "http://localhost:5345/api/v1/",
            backgroundImage: "https://www.happyviaggithailandia.com/app/public/upload/CAMBOGIA/Koh%20Rong%20Samloem/2.jpg",
            register: false,
            rules: {
                required: value => !!value || 'Required.',
                email: value => {
                    const pattern = new RegExp(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        )
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            }
        }),
        methods: {
            async getUser(user) {
                var url = this.baseurl + "profile/user/" + this.activeUser.user_id

                await axios.get(url)
                    .then(response => {
                        this.activeUser = response.data
                        this.$session.set("user", this.activeUser)
                        this.$session.start()
                        this.$emit("authenticated", true)
                        if (this.$router.currentRoute.name != 'login'){
                            this.$router.replace({
                            name: this.$router.currentRoute.query.redirect,
                            params: {
                                userid: this.$router.currentRoute.query.user_id,
                                }
                        })
                        } else {
                            this.$router.replace({
                                name: 'home',
                            })
                        }
                        
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
                    console.log("please enter username and password")
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

<style scoped>
#top-row {
    padding-top: 20vh;
}
#login-container { 
    background-image: url(https://www.happyviaggithailandia.com/app/public/upload/CAMBOGIA/Koh%20Rong%20Samloem/2.jpg);
    background-position: center; 
    height: 92%;
    }

template {
    overflow: hidden;
}

@media only screen and (max-width: 960px){
    #top-row {
        padding-top: 10vh;
    }
}
</style>