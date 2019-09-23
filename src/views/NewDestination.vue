<template>
  <div>
    <v-btn class="mr-4" @click="showOverlay">Edit</v-btn>

    <v-overlay v-if="overlay == true" style="overflow:scroll;">
      <v-container>
        <v-list>
        <v-list-item two-line v-for="(destination, i) in activeUser.destinations" :key="i">

          <v-list-item-content>
            <v-form @submit.prevent="editDestination(destination)">
              <v-row>
                <v-col cols="0" md="0" hidden>
                  <v-text-field name="id" v-model="destination.destination_id" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field label="City" name="city" type="city" v-model="destination.city_name" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field label="Date" name="datestring" type="date" v-model="destination.dateFormat" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field label="Time" name="time" v-model="destination.time" required></v-text-field>
                </v-col>
                <v-col cols="12" md="1">
                  <v-btn type="submit" class="mr-2">Save</v-btn>
                </v-col>
                <v-col cols="12" md="1">
                  <v-btn class="mr-4" @click="deleteDestination(destination)">Delete</v-btn>
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
                  <v-text-field label="City" name="city" v-model="newDestination.city_name" required></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field label="Date" name="date" type="date" v-model="newDestination.date" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field label="Time" name="time" type="time" v-model="newDestination.time" required>
                  </v-text-field>
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
        </v-list>
      </v-container>
    </v-overlay>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'NewDestination',
    props: {
      activeUser: Object,
    },
    data: () => ({
      overlay: false,
      baseurl: "https://fabiserv.uber.space/api/v1/",
      newDestination: {
        city_name: "",
        datestring: "",
        time: "",
        userid: "",
      },
      //activeUser: {}

    }),
    methods: {
      showOverlay() {
        this.overlay = !this.overlay;
      },
      addDestination() {
        var url = this.baseurl + 'destination/add'

        this.newDestination.userid = this.activeUser.user_id
        this.activeUser.destinations.push(this.newDestination)
        console.log(this.activeUser.destinations)
        this.activeUser.destinations.sort(function (a, b) {
          if (a.date < b.date)
            return -1;
          if (a.date > b.date)
            return 1;
          return 0;
        })
        console.log(this.activeUser.destinations)
        this.$session.set("user", this.activeUser)
        axios.post(url, this.newDestination)
          .then(response => {
            this.$emit("addedDestination", true)
          })
          .catch(error => {
            this.errors.push(error)
          })
        //this.$forceUpdate
      },

      editDestination(destination) {
        var url = this.baseurl + 'destination/edit'
        var date = new Date(destination.dateFormat);
        destination.datestring = date.getUTCFullYear() + "-" + this.addZero((date.getMonth()) + 1) + "-" + this.addZero(
          date.getDate())
        var newDestination = {
          city: destination.location,
          date: destination.datestring,
          time: destination.time,
          id: destination.id
        }
        axios.post(url, newDestination)
        .then(response => {
            
          })
          .catch(error => {
            this.errors.push(error)
          })
        this.$forceUpdate
      },
      deleteDestination(destination) {
        var url = this.baseurl + 'destination/delete'
        var newDestination = {
          id: destination.destination_id
        }
        axios.post(url, newDestination)
        .then(response => {
          this.$emit("deletedDestination", true)
            var i = 0
            for(i in this.activeUser.destinations){
              if (this.activeUser.destinations[i].destination_id == newDestination.id){
                this.activeUser.destinations.splice(i, 1)
                this.$session.set("user", this.activeUser)
              }
            }
        })
        .catch(error => {
            this.errors.push(error)
          })
        this.$forceUpdate
      },
      addZero(i) {
        if (i < 10) {
          i = "0" + i
        }
        return i;
      }
    },
    mounted() {
      //this.activeUser = this.$session.get("user")
    }
  }
</script>