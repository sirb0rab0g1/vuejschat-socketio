// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Components from '@/components/index'
import './stylus/main.styl'
import cors from 'cors'
// Import store
import store from './store'

Vue.use(Vuetify)

// import VueSocketIOExt from 'vue-socket.io-extended';
// import io from 'socket.io-client';

// const socket = io('http://192.168.0.199:6001')

// Vue.use(VueSocketIOExt, socket);

import Echo from 'laravel-echo'
window.io = require('socket.io-client');

window.Echo = new Echo({
   broadcaster: 'socket.io',
   namespace: '',
   host: process.env.SOCKET_URL,
   auth: {
        headers: {
            'Authorization': 'Bearer ' + '6f5ac74df4f99f3a7d5760ef66abc4d4'
        }
    }
});

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})
Vue.prototype.$eventHub = new Vue()  // Global event bus

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  template: '<App/>'
})