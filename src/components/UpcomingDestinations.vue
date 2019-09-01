<template>
  <v-row align="center">
    
    <v-card
      class="mx-auto"
      max-width= 30vw
      tile
    >
      <v-list>
        <v-subheader>{{ username }}'s Upcoming Destinations</v-subheader>
        <v-list-item-group v-model="item" color="primary">
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
  },
  data: () => ({
    destinations: [
        {name: "Berlin", date: "2019-10-01"},
        {name: "Buxtehude"}
    ]
  }),
}
</script>