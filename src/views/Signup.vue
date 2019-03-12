<template>
	<v-container white fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs10 sm8 md4 xl3>
				<v-container>
					<h3 class="font-weight-light display-1 text-xs-center">Sign up</h3>
				</v-container>
				<v-container >
					<v-form v-model="valid">
						<v-text-field
							prepend-icon="mdi-account"
							v-model="email"
							label="Email"
							suffix="@estatelinks.net"
							:rules="loginRules"
							color="red darken-3"
							required
						></v-text-field>
						<v-text-field
							prepend-icon="mdi-lock"
							v-model="password"
							label="Password"
							type="password"
							:rules="loginRules"
							color="red darken-3"
							required
						></v-text-field>
					</v-form>
				</v-container>
				<v-container >
					<v-btn
						color="secondary"
						class="white--text"
						:loading="isLoading"
						:disabled="!valid"
						block
						ripple
						@click.native="processSignup"
					>
						Sign up
					</v-btn>
				</v-container>
				<v-container >
					<p class="text-xs-center">
						Already have an account?
						<v-btn
							class="secondary--text pa-0 ma-0"
							ripple flat
							@click.native="$router.replace('/login')"
						>
							login
						</v-btn>

					</p>
				</v-container>
			</v-flex>
		</v-layout>
		<v-snackbar
			:timeout="3000"
			:bottom="true"
			:multi-line="false"
			:vertical="false"
			v-model="snackbar"
			>
			{{ snackbarText }}
			<v-btn flat color="accent" @click.native="snackbar = false">Close</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
	data () {
		return {
			isLoading: false,
			snackbar: false,
			email: '',
			password: '',
			valid: '',
			loginRules: [
				v => !!v || 'Field is required',
			],
			snackbarText: 'An error occured while logging'
		};
	},
	methods: {
		processSignup () {
			this.isLoading = true;
			this.email = this.email.replace('@estatelinks.net');
			firebase.auth().createUserWithEmailAndPassword(`${this.email}@estatelinks.net`, this.password)
				.then(u => {
					this.isLoading = false;
					this.$router.replace('/f');
				})
				.catch(err => {
					this.isLoading = false;
					if (err.code == 'auth/wrong-password' || err.code == 'auth/user-not-found') {
						this.snackbarText = 'Problem signing you up.Try again later';
						this.snackbar = true;
					}
					this.snackbar = true;
					this.snackbarText = 'An error occured while Signing up';
				});
		}
	}
}
</script>
