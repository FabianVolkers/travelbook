<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="12">
                <v-card class="mx-auto" width="100%">
                    <v-img id="cover-photo" class="white--text" v-bind:src="this.user.cover_photo_path">
                        <v-card-title class="align-end fill-height">{{ this.user.username }}'s Travels!</v-card-title>
                    </v-img>

                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="4" xs="12" order="12" order-md="1" order-lg="1">
                <UpcomingDestinations v-bind:username="this.user.username" v-bind:destinations="destinations" />
            </v-col>
            <v-col cols="12" sm="8" xs="12" order="1" order-md="12" order-lg="12">
                <v-card class="mx-auto">
                    <v-card-title>{{ this.user.username }} is in {{ destinations[0].name }}</v-card-title>
                    <iframe id="map" frameborder="0" marginheight="0" marginwidth="0"
                        v-bind:src="'https://www.openstreetmap.org/export/embed.html?bbox=' + (destinations[0].lon-9) + '%2C' + (destinations[0].lat-6) + '%2C' + (destinations[0].lon+9) + '%2C' + (destinations[0].lat+6) + '&amp;layer=mapnik&amp;marker=' + destinations[0].lat + '%2C' + destinations[0].lon">
                    </iframe>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UpcomingDestinations from './UpcomingDestinations'


    export default {
        name: 'ProfileView',
        props: {
            user: Object,
        },
        components: {
            UpcomingDestinations,
            Map,
        },
        data: () => ({
            //pull destinations array from api --> only current & upcoming, onnly for this user
            destinations: [{
                    name: "Madrid",
                    lat: 40.4167754,
                    lon: -3.7037902,
                    date: "2019-09-01 10:00:00"
                },
                {
                    name: "Berlin",
                    lat: "52.543",
                    lon: "23.45",
                    date: "2019-10-01 10:00:00"
                },
                {
                    name: "Perth",
                    lat: -32.065555810864744,
                    lon: 115.7190338134766,
                    date: "2019-11-01 12:30:00"
                },
            ]
        }),
    }
</script>

<style scoped>
    #title-row {
        background-position: center;
        background-size: cover;
        height: 10vh;
    }

    #title-row h1 {
        justify-self: end;
    }

    #map {
        padding: 10px 10px 10px 10px;
        width: 100%;
        min-height: 30vh;
    }

    #cover-photo {
        height: 10vh;
    }

    @media screen and (min-width: 500px) {
        #title-row {
        height: 30vh;
    }
        #cover-photo {
        height: 30vh;
    }
    #map {
        min-height: 50vh;
    }
    }
</style>