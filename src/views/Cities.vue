<template>
      <v-container>
          <h1>Manage Cities</h1>
      
          <v-list-item two-line v-for="city in cities" :key="city.id">
            
            <v-list-item-content>
              <v-form @submit.prevent="editCity(city)">
              <v-row>
                <v-col cols="0" md="0" hidden>
                  <v-text-field name="id" v-model="city.id" required></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field label="City" name="city" v-model="city.city_name" required></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                  <v-text-field label="Latitude" name="lat" v-model="city.lat" required> </v-text-field>
                </v-col>
                <v-col cols="12" md="2"><v-text-field label="Longitude" name="lon" v-model="city.lon" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                <v-text-field label="Photo Url" name="url" v-model="city.photo_url" required></v-text-field>
              </v-col>
                <v-col cols="12" md="1"><v-btn type="submit" class="mr-2">Save</v-btn>
                </v-col>
                <v-col cols="12" md="1"><v-btn class="mr-4" @click="deleteCity(city)">Delete</v-btn>
                </v-col>
              </v-row>
              </v-form>
            </v-list-item-content>
          </v-list-item>
      
      <v-list-item>
        <v-list-item-content>
            <v-form @submit.prevent="addCity">
            <v-row>
              <v-col cols="12" md="2">
                <v-text-field label="City" name="city" v-model="newCity.city_name" required></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field label="Latitude" name="lat" v-model="newCity.lat" required></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field label="Longitude" name="lon" v-model="newCity.lon" required></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field label="Photo Url" name="url" v-model="newCity.photo_url" required></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn type="submit" class="mr-4">Add City</v-btn>
              </v-col>
           
          </v-row>
           </v-form>

        </v-list-item-content>
      </v-list-item>
      </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Cities',
    props: {
      destinations: Array,
      user: Object,
    },
    data: () => ({
      baseurl: "http://localhost:5345/api/v1/",
      cities: [],
      newCity: {
          city_name: "",
          lat: "",
          lon: "",
          photo_url: ""
      }

    }),
    methods: {
      getCities(){
          axios.get(this.baseurl + "cities")
          .then(response => {
                        // JSON responses are automatically parsed
                        this.cities = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
      },
      addCity(){
        var url = this.baseurl + 'city/add'
        
        axios.post(url, this.newCity)
        this.$forceUpdate
      },

      editCity(city){
        var url = this.baseurl + 'city/edit'
        var date = new Date(city.date);
        city.datestring = date.getUTCFullYear() + "-" + this.addZero((date.getMonth())+1) + "-" + this.addZero(date.getDate())
        var updatedCity = {
          name: city.location,
          date: city.datestring,
          time: city.time,
          id: city.id
        }
        axios.post(url, updatedCity)
        this.$forceUpdate
      },
      deleteCity(city){
        var url = this.baseurl + 'city/delete'
        var delCity = {
          id: city.id
        }
        axios.post(url, delCity)
        this.$forceUpdate
      },
      addZero(i) {
        if(i < 10){
          i = "0" + i
        }
        return i;
      }
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
        this.getCities()
    }
  }
</script>