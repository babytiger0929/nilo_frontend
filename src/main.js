import Vue from 'vue'
import App from './App'
import router from './router'

import firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue';
import './styles/global.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

let firebaseConfig = {
    apiKey: "AIzaSyAIAXzSik1K75v1yhB9MEx0hl6xpqYmSvM",
    authDomain: "nilo-f8b40.firebaseapp.com",
    databaseURL: "https://nilo-f8b40.firebaseio.com",
    projectId: "nilo-f8b40",
    storageBucket: "nilo-f8b40.appspot.com",
    messagingSenderId: "840005357071",
    appId: "1:840005357071:web:9c47d5321c3fdad1aa1d7a",
    measurementId: "G-49VVG5C9RS"
};
firebase.initializeApp(firebaseConfig);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
