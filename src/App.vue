<template>
	<v-app>
		<router-view :user="user" :userIsLive="userIsLive" :showSnackbar="showSnackbar" :load="load"  />

		<v-snackbar
			v-model="snackbar.show"
			app bottom
		>
			{{snackbar.text}}
			<v-btn flat color="accent" @click.native="snackbar.show = false">Close</v-btn>
		</v-snackbar>
		
		<v-dialog-transition>
			<v-container v-if="appIsLoading" fill-height fluid class="white" style="position: absolute; left: 0; right: 0;">
				<v-layout justify-center align-center>
					<v-flex xs6 align-center justify-center>
						<img src="@/assets/icon.png" class="app-load-icon">
						<p class="black-text text-xs-center subtitle">Loading...</p>
					</v-flex>
				</v-layout>
			</v-container>
		</v-dialog-transition>
	</v-app>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/auth';

export default {
	data () {
    	return {
			appIsLoading: false,
			userIsLive: false,
			user: {},
			snackbar: {
				show: false,
				text: ''
			}
    	};
  	},
	methods: {
		load (state) {
			this.appIsLoading = state || false;
		},
		showSnackbar (text) {
			this.snackbar.text = text;
			this.snackbar.show = true;
		}
	},
	beforeRouteEnter (to, from, next) {

	},
	mounted () {
		// check for user
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.userIsLive = true;
				this.user = user
			}
			else {
				this.userIsLive = false;
				this.user = user
			}
		});
	},
}
</script>

<style>
.app-load-icon {
	display: flex;
	margin: 0 auto;
	animation: dim-icon ease-in-out 1s infinite alternate
}
.capitalize {
	text-transform: capitalize !important;
}

@-webkit-keyframes dim-icon {
	0% {
		opacity: 0.2;
	}
	100% {
		opacity: 1;
	}
}
@keyframes dim-icon {
	0% {
		opacity: 0.2;
	}
	100% {
		opacity: 1;
	}
}
</style>
