<template>
  <div>
    <v-btn class="mr-4" @click="showOverlay">Edit</v-btn>
    <v-overlay v-if="overlay == true">
      <v-container>
      
          <v-list-item two-line v-for="(destination, i) in destinations" :key="i">
            
            <v-list-item-content>
              <v-form @submit.prevent="editDestination(destination)">
              <v-row>
                <v-col cols="0" md="0" hidden>
                  <v-text-field name="id" v-model="destination.id" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field label="City" name="city" v-model="destination.location" required></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field label="Date" name="datestring" type="date" v-model="destination.dateFormat" required> </v-text-field>
                </v-col>
                <v-col cols="12" md="3"><v-text-field label="Time" name="time" v-model="destination.time" required></v-text-field>
                </v-col>
                <v-col cols="12" md="1"><v-btn type="submit" class="mr-2">Save</v-btn>
                </v-col>
                <v-col cols="12" md="1"><v-btn class="mr-4" @click="deleteDestination(destination)">Delete</v-btn>
                </v-col>
              </v-row>
              </v-form>
            </v-list-item-content>
          </v-list-item>
      
      <v-list-item>
        <v-list-item-content>
            <v-form @submit.prevent="addDestination">
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field label="City" name="city" v-model="newDestination.city" required></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field label="Date" name="date" type="date" v-model="newDestination.date" required></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field label="Time" name="time" type="time" v-model="newDestination.time" required></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn type="submit" class="mr-4">Add Destination</v-btn>
              </v-col>
           
          </v-row>
           </v-form>

        </v-list-item-content>
      </v-list-item>
      <v-row>
        <v-col>
          <v-btn class="mr-4" @click="showOverlay">Close</v-btn>
        </v-col>
      </v-row>
      </v-container>
    </v-overlay>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'NewDestination',
    props: {
      destinations: Array,
      user: Object,
    },
    data: () => ({
      overlay: false,
      baseurl: "http://localhost:5345/",
      newDestination: {
        city: "",
        datestring: "",
        time: "",
        userid: "",
      }

    }),
    methods: {
      showOverlay() {
        this.overlay = !this.overlay;
      },
      addDestination(){
        var url = this.baseurl + 'destination/add'
        
        /*
        var addDestination = {
          userid: this.user.id,
          city: this.newDestination.city,
          date: this.newDestination.date,
          time: this.newDestination.time
        }
        console.log(addDestination)
        */
       this.newDestination.userid = this.user.id
        console.log(this.newDestination)
        
        axios.post(url, this.newDestination)
        this.$forceUpdate
      },

      editDestination(destination){
        var url = this.baseurl + 'destination/edit'
        var date = new Date(destination.date);
        destination.datestring = date.getUTCFullYear() + "-" + this.addZero((date.getMonth())+1) + "-" + this.addZero(date.getDate())
        var newDestination = {
          city: destination.location,
          date: destination.datestring,
          time: destination.time,
          id: destination.id
        }
        console.log("updating destination")
        axios.post(url, newDestination)
        this.$forceUpdate
      },
      deleteDestination(destination){
        var url = this.baseurl + 'destination/delete'
        var newDestination = {
          id: destination.id
        }
        console.log("deleting destination")
        axios.post(url, newDestination)
        this.$forceUpdate
      },
      addZero(i) {
        if(i < 10){
          i = "0" + i
        }
        return i;
      }
    },
    mounted() {

    }
  }
</script>