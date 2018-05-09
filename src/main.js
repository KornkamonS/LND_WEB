// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { firebaseApp, db } from '@/firebaseConfig'
import VueResource from 'vue-resource'
// import VueSession from 'vue-session'

// Vue.use(VueSession);
Vue.use(VueResource);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    var currentUser = firebase.auth().currentUser;

    var requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser)
        next({ name: 'Index' });
    else if (!requiresAuth && currentUser)
        next({ name: 'Home' });
    else
        next();
})

let app;

firebase.auth().onAuthStateChanged(
    user => {
        if (!app) {
            app = new Vue({
                el: '#app',
                router,
                template: '<App/>',
                components: { App }
            })
        }
    }
)