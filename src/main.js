import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import { config } from '../config/firebaseConfig';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


// let mapSrc = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDTZSR1dstA2uzBaTsOADTgkRKDCf88gbI";
let mapSrc = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAwELp06Vazfjpm8QILwoqdPuKtWVaVu0M";
let mapScript = document.createElement('script');

mapScript.src = mapSrc;
mapScript.async = true;
mapScript.defer = true;

document.getElementsByTagName('head')[0].appendChild(mapScript);

// Initialize Firebase

firebase.initializeApp(config);

const firestore = firebase.firestore();
firestore.settings({
	timestampsInSnapshots: true
});


Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth) {
		firebase.auth().onAuthStateChanged(user => {
			if (user) next();
			else next('/f');
		});
	}
	else {
		next();
	}
});

router.onError(err => {
	console.log(err);
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
