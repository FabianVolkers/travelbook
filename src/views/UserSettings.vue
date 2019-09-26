<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="0" md="1">
            </v-col>
            <v-col cols="12" md="10">
                <v-card>
                    <v-card-title>User Settings</v-card-title>
                </v-card>
                <v-card>
                    <v-card-title>Personal Information</v-card-title>
                    <v-form>
                        <v-card-text>Change Profile Photo</v-card-text>
                    <v-text-field :rules="[]" label="Name" name="name" :append-icon="'mdi-edit'"
                                    @click:append="() => (e1 = !e1)" v-model="activeUser.user_name">
                                </v-text-field>
                                <v-text-field :rules="[]" label="Email" name="email" :append-icon="'mdi-edit'"
                                    @click:append="() => (e1 = !e1)" v-model="activeUser.email">
                                </v-text-field>
                                <v-btn color="warning">Save Changes</v-btn>
                    </v-form>
                                <v-card-title>Change Password</v-card-title>
                                <v-form>
                                <v-text-field :rules="[]" label="Current Password" name="currentPassword" v-model="passwordCurrent" required :append-icon="p1 ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append="() => (p1 = !p1)" :type="p1 ? 'text' : 'password'">
                                </v-text-field>
                                <v-text-field :rules="[]" label="New Password" name="newPassword" v-model="passwordNew" required :append-icon="p2 ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append="() => (p2 = !p2)" :type="p2 ? 'text' : 'password'">
                                </v-text-field>
                                <v-text-field :rules="[]" label="Repeat Password" name="repeat Password" v-model="passwordRepeat" required :append-icon="p3 ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append="() => (p3 = !p3)" :type="p3 ? 'text' : 'password'">
                                </v-text-field>
                                <v-btn color="warning">Change Password</v-btn>
                                </v-form>
                </v-card>
                <v-card>
                    <v-card-title>Privacy Settings</v-card-title>

                </v-card>
                <v-card v-if="activeUser.admin_status == 1">
                    <v-card-title>Admin Settings</v-card-title>
                    <v-list>
        <v-list-item @click="$router.push({name: 'users'})">
<v-list-item-title>Manage Users</v-list-item-title>
        </v-list-item> 
        <v-list-item @click="$router.push({name: 'cities'})">
<v-list-item-title>Manage Cities</v-list-item-title>
        </v-list-item>         
        
      </v-list>
                </v-card>
            </v-col>
            <v-col cols="0" md="1">
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>

export default {
  name: 'UserSetting',
  props: {
  },
  data: () => ({
      e1: false,
      e2: false,
      p1: false,
      p2: false,
      p3: false,
      activeUser: {},
      passwordCurrent: "",
      passwordNew: "",
      passwordRepeat: "",

  }),
  methods: {
      getSessionUser() {
                this.activeUser = this.$session.get("user")
            }
  },
  mounted(){
      this.getSessionUser()
  }
}
</script>