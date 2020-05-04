import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';
import Login from '@/views/Login'
import Register from '@/views/Register'
import Reader from '@/views/Reader'
import Test from '@/views/Test'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/home',
            name: 'reader',
            component: Reader,
            meta: {
                auth: true
            }
        },
        {
            path: '/test',
            name: 'test',
            component: Test,
            meta: {
                auth: true
            }
        },
        {
            path: '*',
            redirect: '/login'
        }
    ],
});

router.beforeEach((to, from, next) => {

    firebase.auth().onAuthStateChanged(userAuth => {

        if (userAuth) {
            firebase.auth().currentUser.getIdTokenResult()
                .then(function ({
                                    claims
                                }) {

                    // if (claims.reader) {
                    //     if (to.path !== '/reader')
                    //         return next({
                    //             path: '/reader',
                    //         })
                    // } else if (claims.writer) {
                    //     if (to.path !== '/admin')
                    //         return next({
                    //             path: '/admin',
                    //         })
                    // } else if (claims.commenter) {
                    //     if (to.path !== '/driver')
                    //         return next({
                    //             path: '/driver',
                    //         })
                    // }

                })
        } else {
            if (to.matched.some(record => record.meta.auth)) {
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    }
                })
            } else {
                next()
            }
        }

    });

    next()

});

export default router
