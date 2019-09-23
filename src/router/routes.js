import Vue from 'vue'
import Router from 'vue-router'
import ProfileView from '../views/ProfileView'
import UserSettings from '../views/UserSettings'
import Friends from '../views/Friends'
import Search from '../views/Search'
//import AdminPanel from '../views/AdminPanel'
import Cities from '../views/Cities'
import Users from '../views/Users'
import Login from '../views/Login'
import Home from '../views/Home'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login
        },

        {
            path: "/home",
            name: "home",
            component: Home,
        },
        {
            path: "/profile/user/:userid",
            name: "profile",
            component: ProfileView,
            props: true,
        },
        {
            path: "/settings",
            name: "settings",
            component: UserSettings,
        },
        {
            path: "/friends",
            name: "friends",
            component: Friends,
            props: true,
        },
        {
            path: "/search",
            name: "search",
            component: Search,
        },
        {
        path: "/cities",
            name: "cities",
            component: Cities,
        },
        {
        path: "/users",
            name: "users",
            component: Users,
        }
    ]
})