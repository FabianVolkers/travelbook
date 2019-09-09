
<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="City"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Date"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Time"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
          <v-col>
              <v-btn class="mr-4" @click="submit">submit</v-btn>
          </v-col>
      </v-row>
    </v-container>
    
  </v-form>
</template>

<script>
export default {
    name: 'NewDestination'
}
</script>