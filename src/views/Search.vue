<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="12">
                <v-form @submit.prevent="getSearch()">
                <v-text-field label="Search" v-model="query"></v-text-field>
                <v-btn type="submit">Search</v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-list-item v-for="(user, i) in searchResults" :key="i" @click="$router.push({name: 'profile', params: {userid: user.user_id}})">
                    <v-list-item-title>{{  user.user_name  }}</v-list-item-title>
                </v-list-item>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Search',
  props: {
  },
  data: () => ({
      query: "",
      searchResults: null,
      baseurl: "https://fabiserv.uber.space/api/v1/",
  }),
  methods: {
      async getSearch(){
                var url = this.baseurl + "search/" + this.query
                await axios.get(url)
                    .then(response => {
                        console.log(response.data)
                        this.searchResults = response.data.slice()
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
      },
  }
}
</script>