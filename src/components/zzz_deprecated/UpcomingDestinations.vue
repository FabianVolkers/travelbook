<template>
  <v-row align="center">

    <v-card class="mx-auto" tile>
      <v-card-title>{{ user.name }}'s Upcoming Destinations</v-card-title>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-html="destinations[1].location"></v-list-item-title>
              <v-list-item-subtitle v-html="countdownString"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group color="primary">
          <v-list-item two-line v-for="(destination, i) in upcoming" :key="i">
            <v-list-item-content>
              <v-list-item-title v-html="destination.location"></v-list-item-title>
              <v-list-item-subtitle v-html="destination.datestring"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      
      <NewDestination v-bind:destinations="destinations" v-bind:user="user"/>
    </v-card>
  </v-row>
</template>

<script>
import NewDestination from '../views/NewDestination'

  export default {
    name: 'UpcomingDestinations',
    props: {
      user: Object,
      destinations: Array,
    },
    components: {
            NewDestination,
        },
    data: () => ({
      interval: "",
      countdownString: "",
      upcoming: [],
      edit: false,
      overlay: false,
      day: "",
      time: "",
    }),
    methods: {
      countdown: function (timestamp) {
        // Get todays date and time
        var x = setInterval(function () {
          var now = new Date().getTime();

          var countdownTime = new Date(timestamp);

          // Find the distance between now and the count down date
          var distance = countdownTime - now;

          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // return countdown string
          //var countdownString
          if (distance < 0) {
            this.countdownString = "Expired"
          } else {
            this.countdownString = days + " days " + hours + " hours " + minutes + " minutes " + seconds +
              " seconds ";
          }
          //console.log(this.countdownString);
        }.bind(this), 1000)
      },
      displayArray: function (destinationsArray) {
        this.upcoming = destinationsArray.slice();
        this.upcoming.shift();
        this.upcoming.shift();
      },
      formatDateTime() {
        var i = 0
        for(i in this.destinations){
        var date = new Date(destinations[i].date)
        var timestring = ""
        var datestring = date.toDateString()
        console.log(datestring)
        console.log(timestring)
        destinations[i].datestring = datestring + timestring;
        destinations[i].time = this.addZero(date.getHours()) + ":" + this.addZero(date.getMinutes())
        i = i +1
        }
        
      },
      addZero(i) {
        if(i < 10){
          i = "0" + i
        }
        return i;
      }

    },
    beforeMount() {
      
      this.countdown(this.destinations[1].date);
      
    },
    created() {
      console.log(destinations)
      this.countdown(this.destinations[1].date);
      this.formatDateTime(this.destinations);
      this.displayArray(this.destinations);
      this.$forceUpdate();
    },

  }
</script>