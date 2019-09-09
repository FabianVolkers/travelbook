<template>
  <v-row align="center">
    
    <v-card
      class="mx-auto"
      tile
    >
    <v-card-title>{{ username }}'s Upcoming Destinations</v-card-title>
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
          <v-list-item two-line
            v-for="(destination, i) in upcoming"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-html="destination.location"></v-list-item-title>
              <v-list-item-subtitle v-html="destination.date"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-btn class="mr-4" href="./NewDestination.vue">Add Destination</v-btn>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'UpcomingDestinations',
  props: {
    date: Date,
    username: String,
    destinations: Array,
  },
  data: () => ({
      interval: "",
    countdownString: "",
    upcoming: [],
  }),
  methods: {
      countdown: function(timestamp){
        // Get todays date and time
        var x = setInterval(function() {
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
                this.countdownString = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";
            }
            //console.log(this.countdownString);
      }.bind(this), 1000)
    },
    displayArray: function(destinationsArray){
        this.upcoming = destinationsArray.slice();
        this.upcoming.shift();
        this.upcoming.shift();
    }
  },
  beforeMount(){
      this.countdown(this.destinations[1].date);
      
      
      //
  },
  mounted(){
      this.countdown(this.destinations[1].date);
      this.displayArray(this.destinations);
      console.log(this.destinations);
      this.$forceUpdate();
  },

}
</script>