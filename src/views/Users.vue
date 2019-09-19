<template>
    <v-container>
        <h1>Manage Users</h1>

        <v-list-item two-line v-for="user in users" :key="user.id">

            <v-list-item-content>
                <v-form @submit.prevent="editUser(user)">
                    <v-row>
                        <v-col cols="12" md="1">
                            <v-text-field name="id" label="User id" v-model="user.user_id" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field label="Name" name="user_name" v-model="user.user_name" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field label="Email" name="email" v-model="user.email" required> </v-text-field>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-checkbox label="Admin Status" v-model="user.admin_status"></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="1">
                            <v-btn type="submit" class="mr-2">Save</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn class="mr-4" @click="deleteUser(user)">Delete</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-list-item-content>
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-form @submit.prevent="addUser">
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-text-field label="Name" name="user_name" v-model="newUser.user_name" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field label="Email" name="email" type="email" v-model="newUser.email" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-text-field label="Password" name="password" type="password" v-model="newPassword" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-checkbox label="Admin Status" v-model="newUser.admin_status"></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-btn type="submit" class="mr-4">Add User</v-btn>
                        </v-col>

                    </v-row>
                </v-form>

            </v-list-item-content>
        </v-list-item>-
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Users',
        props: {
            destinations: Array,
            user: Object,
        },
        data: () => ({
            baseurl: "http://localhost:5345/api/v1/",
            users: [],
            newPassword: "",
            newUser: {
                email: "",
                user_name: "",
                password_hash: "",
                admin_status: false,
            }

        }),
        methods: {
            getUsers() {
                axios.get(this.baseurl + "users")
                    .then(response => {
                        // JSON responses are automatically parsed
                        this.users = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            addUser() {
                var url = this.baseurl + 'user/add'

                axios.post(url, this.newCity)
                this.$forceUpdate
            },

            editUser(user) {
                var url = this.baseurl + 'user/edit'
                var updatedUser = {
                    email: user.email,
                    user_name: user.user_name,
                    password_hash: user.password_hash,
                }
                axios.post(url, updatedUser)
                this.$forceUpdate
            },
            deleteUser(user) {
                var url = this.baseurl + 'user/delete'
                var delUser = {
                    id: user.user_id
                }
                axios.post(url, delUser)
                this.$forceUpdate
            },
        },
        beforeCreate: function () {
      if (!this.$session.exists() || !this.$session.get("user").admin_status) {
          if(this.$router.currentRoute.name != "login"){
          this.$router.push({
          name: "login",
          query: { redirect: this.$router.currentRoute.name }
        });
          }
        }
    },
        mounted() {
            this.getUsers()
        }
    }
</script>