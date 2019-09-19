<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="0" md="1">
            </v-col>
            <v-col cols="12" md="10">
                <v-card>
                    <v-card-title>Settings</v-card-title>
                </v-card>
                <v-card>
                    <v-card-title>Personal Information</v-card-title>
                </v-card>
                <v-card>
                    <v-card-title>Privacy Settings</v-card-title>
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
  }
}
</script>