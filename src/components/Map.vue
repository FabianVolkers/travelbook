<template>
    <v-container fluid>
        <v-row id="title-row" no-gutters>
            <v-col cols="12">
                <div id="map"></div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import 'ol/ol.css';
    import Map from 'ol/Map';
    import View from 'ol/View';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM.js';
    import VectorSource from 'ol/source/Vector';
    import VectorLayer from 'ol/layer/Vector';
    import Feature from 'ol/Feature';
    import Point from 'ol/geom/Point';
    import Style from 'ol/style/Style';
    import Icon from 'ol/style/Icon';
    import {
        fromLonLat
    } from 'ol/proj.js';

    export default {
        name: 'MapComponent',
        props: {
            users: Array,
        },
        data: () => ({
            map: {},
        }),
        methods: {
            addLayer(user) {
                
                var layer = new VectorLayer({
                    source: new VectorSource({
                        features: [
                            new Feature({
                                geometry: new Point(
                                    fromLonLat([user.current_location.lon, user
                                        .current_location.lat
                                    ])
                                ),
                                name: "",
                            }),
                        ]
                    }),
                    style: new Style({
                        image: new Icon({
                            src: 'https://fabiserv.uber.space/travelapp/images/users/placeholder.png',//+ user.profile_photo,
                            scale: 0.09,
                        })
                    })
                })
                
                this.map.addLayer(layer)
            },


            loadMap(lat, lon) {
                var zoom  = 4
                if (this.users[1] || !this.users[0].current_location) {
                    zoom = 2
                }
                this.map = new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                            preload: 4,
                            source: new OSM()
                        })
                    ],
                    view: new View({
                        center: fromLonLat([lon, lat]),
                        zoom: zoom,
                    }),
                })

            },
        },
        mounted() {
            if (this.users[0]) {
                if (this.users[0].current_location) {
                    this.loadMap(this.users[0].current_location.lat, this.users[0].current_location.lon)
                    var i = 0
                    for (i in this.users) {
                        this.addLayer(this.users[i])
                        i += 1
                    }
                } else {
                    this.loadMap(0, 0)
                }
            } 




        },
        created() {

        }
    }
</script>