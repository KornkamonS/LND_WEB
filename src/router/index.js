import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index'
import register from '@/components/Register'
import home from '@/components/Home'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '*',
            redirect: { name: 'Index' }
        },
        {
            path: '/',
            name: 'Index',
            component: index
        },
        {
            path: '/register',
            name: 'Register',
            component: register
        },
        {
            path: '/home',
            name: 'Home',
            component: home
        }
    ],
    mode: 'history',
})