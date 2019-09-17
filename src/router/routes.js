import Vue from 'vue'
import Router from 'vue-router'
import ProfileView from '../views/ProfileView'
import Friends from '../views/Friends'
import AdminPanel from '../views/AdminPanel'
import Login from '../views/Login'
import Home from '../views/Home'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: "home"
            }
        },
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
            path: "/user/:userid/:username",
            name: "profile",
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