<template>
  <v-row align="center">
    
    <v-card
      class="mx-auto"
      max-width= 30vw
      tile
    >
    <h3 id="countdownElem">{{ destinations[1].name }}: {{ countdownString }}</h3>
      <v-list>
        <v-subheader>{{ username }}'s Upcoming Destinations</v-subheader>
        <v-list-item-group v-model="destination" color="primary">
          <v-list-item two-line
            v-for="(destination, i) in destinations"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-html="destination.name"></v-list-item-title>
              <v-list-item-subtitle v-html="destination.date"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
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
    countdownString: "countdown",
  }),
  methods: {
      countdown: function(timestamp){
        // Get todays date and time
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
            console.log(this.countdownString);
      },

  },
  beforeMount(){
      //this.countdown(this.destinations[1].date);
      //this.$forceUpdate();
  },
  created(){
      var x = setInterval(this.countdown(this.destinations[1].date), 1000);
  }
}
</script>