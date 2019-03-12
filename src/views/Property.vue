<template>
	<v-slide-y-reverse-transition>
		<v-container fluid class="pa-0 white">
			<v-toolbar color="secondary" dark tabs app>
				<v-toolbar-side-icon @click="$router.back()">
					<v-icon>mdi-arrow-left</v-icon>
				</v-toolbar-side-icon>
				<v-toolbar-title v-text="property.name"> ... </v-toolbar-title>
				<v-spacer></v-spacer>
				<v-menu bottom left>
					<v-btn
						slot="activator"
						dark
						icon
					>
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>

					<v-list>
						<v-list-tile @click="" >
							<v-list-tile-title>Delete Property</v-list-tile-title>
						</v-list-tile>
						<v-list-tile @click="" >
							<v-list-tile-title>Edit Property</v-list-tile-title>
						</v-list-tile>
						<v-list-tile @click="" >
							<v-list-tile-title>Report</v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>

				<v-tabs
					slot="extension"
					v-model="propertyTabs"
					color="transparent"
					slider-color="accent"
					show-arrows
				>
					<v-tab href="#about" ripple>
						about
					</v-tab>
					<v-tab href="#location" ripple>
						location
					</v-tab>
					<v-tab v-if="userIsLive" href="#inspection" ripple>
						inspection
					</v-tab>
					<v-tab v-if="userIsLive" href="#administrative" ripple>
						administative
					</v-tab>
					<v-tab href="#characteristics" ripple>
						Characteristics
					</v-tab>
					<v-tab v-if="userIsLive" href="#history" ripple>
						History
					</v-tab>
					<v-tab :to="{ name: 'gallery', param: { id: property.id } }" ripple>
						gallery
					</v-tab>
				</v-tabs>
			</v-toolbar>

			<v-content>
				<v-tabs-items v-model="propertyTabs">
					<v-tab-item value="about">
						<About :property="property" />
					</v-tab-item>
					<v-tab-item value="location" lazy>
						<Location :property="property" />
					</v-tab-item>
					<v-tab-item v-if="userIsLive" value="inspection" lazy>
						<Inspection :property="property" />
					</v-tab-item>
					<v-tab-item v-if="userIsLive" value="administrative" lazy>
						<Administrative :property="property" />
					</v-tab-item>
					<v-tab-item value="characteristics" lazy>

					</v-tab-item>
					<v-tab-item v-if="userIsLive" value="history" lazy>

					</v-tab-item>
				</v-tabs-items>
			</v-content>
		</v-container>
	</v-slide-y-reverse-transition>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

import About from '@/components/propertyTabs/About';
import Location from '@/components/propertyTabs/Location';
import Inspection from '@/components/propertyTabs/Inspection';
import Administrative from '@/components/propertyTabs/Administrative';

export default {
	props: ['showSnackbar', 'load', 'userIsLive'],
	components: {
		About, Location, Inspection, Administrative
	},
	data () {
		return {
			property: {},
			propertyTabs: 'about'
		};
	},
	methods: {
		async getData (id) {
			try {
				let db = firebase.firestore();
				let doc = await db.collection('property').doc(id).get();

				this.property = doc.data();

				console.log(this.property);

				return Promise.resolve('done');
			} catch (error) {
				console.log(error);
				return Promise.reject(error)
			}
		}
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
			vm.load(true);
			vm.getData(to.params.id)
				.then(res => vm.load(false))
				.catch(err => {
					vm.load(false);
					this.showSnackbar('Error fetching resource. Network error.');
					vm.$router.back();
				});
		});
	},
	beforeRouteUpdate (to, from, next) {
		this.load(true);
		this.getData(to.params.id)
			.then(res => {
				this.load(false);
				next();
			})
			.catch(err => {
				this.load(false);
				this.showSnackbar('Error fetching resource. Network error.');
				next(false);
			});
	}
}
</script>

<style>
.v-toolbar .v-toolbar__extension {
	padding: 0 !important;
}
</style>
