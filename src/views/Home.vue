<template>
	<v-slide-y-reverse-transition>
		<v-container fluid class="pa-0">
			<v-toolbar color="white" flat app>
				<v-toolbar-side-icon @click.stop="drawer = true"></v-toolbar-side-icon>
				<v-layout align-center justify-center>
					<v-toolbar-title class="text-center-xs">
						<img src="@/assets/logo.png" alt="Estate Links" height="40">
					</v-toolbar-title>
				</v-layout>
				<v-btn  icon to="s">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-toolbar>

			<v-navigation-drawer
				v-model="drawer"
				absolute
				temporary
			>
				<v-list>
					<v-list-tile v-if="userIsLive" avatar>
						<v-list-tile-avatar>
							<v-icon>mdi-account-circle</v-icon>
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>Hello, {{ user.email }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile v-if="!userIsLive" to="/login">
						<v-list-tile-title class="text-xs-center primary--text">Login</v-list-tile-title>
					</v-list-tile>
					<v-list-tile v-if="!userIsLive" to="/signup" class="primary">
						<v-list-tile-title class="text-xs-center white--text">Sign up</v-list-tile-title>
					</v-list-tile>
					<v-divider></v-divider>
					<v-list-tile avatar to="/map">
						<v-list-tile-avatar>
							<v-icon>mdi-map</v-icon>
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>View map visualiztion</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile avatar to="/settings">
						<v-list-tile-avatar>
							<v-icon>mdi-settings</v-icon>
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>Settings</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-list-tile v-if="userIsLive" @click="logout">
						<v-list-tile-title class="text-xs-center red--text text--darken-3">Log out</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>

			<v-content>
				<router-view :userIsLive="userIsLive" :showSnackbar="showSnackbar" :load="load" />
			</v-content>

			<v-bottom-nav
					:value="true"
					fixed
					app
					color="white"
					style="z-index: 1"
				>
					<v-btn
						color="red darken-3"
						flat
						to="p"
					>
						<span>All properties</span>
						<v-icon>mdi-home-variant</v-icon>
					</v-btn>
					<v-btn
						color="red darken-3"
						flat
						to="f"
					>
						<span>Filter</span>
						<v-icon>mdi-filter</v-icon>
					</v-btn>
					<v-btn
						v-if="userIsLive"
						color="red darken-3"
						flat
						to="new"
					>
						<span>Add new</span>
						<v-icon>mdi-home-plus</v-icon>
					</v-btn>
			</v-bottom-nav>
		</v-container>
	</v-slide-y-reverse-transition>
</template>

<script>
export default {
	props: ['user', 'userIsLive', 'load', 'showSnackbar'],
	data () {
		return {
			drawer: false,
		};
	},
	methods: {
		logout () {
			firebase.auth().signOut()
				.then(() => {
					this.userIsLive = false;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
}
</script>

<style>

</style>
