import Vue from 'vue'
import Router from 'vue-router'
import ProfileView from '../views/ProfileView'
import Friends from '../views/Friends'
import AdminPanel from '../views/AdminPanel'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            
        },
        {
            path: "/user/:userid/:username",
            name: "user",
            component: ProfileView,
            props: true,
        },
        {
            path: "/friends/user/:userid/",
            name: "friends",
            component: Friends,
            props: true,
        },
        {
            path: "/admin",
            name: "admin",
            component: AdminPanel,
        }
    ]
})