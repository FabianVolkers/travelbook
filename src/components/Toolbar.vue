<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Travelbook</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn text>Home</v-btn>
        <v-btn text>Friends</v-btn>
        <v-btn text>Travel Guides</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    activePage: String
  }
}
</script>