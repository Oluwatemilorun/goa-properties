<template>
	<v-slide-x-transition>
		<v-container fill-height fluid class="pa-0">
			<v-flex xs12>
				<v-list two-line subheader>
					<div v-for="(area, i) in sortedAreas" :key="i" class="p-list-wrapper">
						<v-subheader inset class="capitalize">{{area}}</v-subheader>
						<v-list-tile
							v-if="loadProperties(area).length >= 1"
							v-for="item in loadProperties(area)"
							:key="item.id"
							avatar
							:to="`/property/${item.id}`"
							ripple
						>
							<v-list-tile-avatar>
								<img :src="item.cover" :alt="item.type">
							</v-list-tile-avatar>

							<v-list-tile-content style="width: calc(100% - 200px)">
								<v-list-tile-title>{{ item.name }}</v-list-tile-title>
								<v-list-tile-sub-title style="font-weight: 400 !important">{{ item.type }}</v-list-tile-sub-title>
								<v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
							</v-list-tile-content>

							<v-list-tile-action style="width: 120px">
								<v-layout row wrap fill-height align-center justify-end>
									<v-chip label small class="right" :color="item.isAvailable ? 'green' : 'red'" text-color="white">{{ item.isAvailable ? 'Available' : 'Unavailable' }}</v-chip>
									<!-- <v-spacer></v-spacer> -->
									<!-- <v-btn icon ripple @click.stop="">
										<v-icon color="grey lighten-1">mdi-map</v-icon>
									</v-btn> -->
									
								</v-layout>
								<!-- <v-list-tile-action-text>
								</v-list-tile-action-text> -->
							</v-list-tile-action>
						</v-list-tile>
						<p v-else class="text-xs-center black--text">No property in this area</p>
					</div>
				</v-list>
			</v-flex>
		</v-container>
	</v-slide-x-transition>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
	props: ['showSnackbar', 'load'],
	data () {
		return {
			areas: [
				'ikoyi',
				'victoria island',
				'lagos land',
				'lekki',
				'ajah',
				'apapa',
				'surulere',
				'yaba',
				'satellite',
				'maryland',
				'ikeja',
				'oshodi',
				'anthony',
				'shomolu',
				'mushin',
				'ilupeju',
				'epe',
				'isolo',
				'akete',
				'vgc',
			],
			properties: [],
			dataIsReady: false
		};
	},
	computed: {
		sortedAreas () {
			return this.areas.sort();
		}
	},
	methods: {
		loadProperties (area) {
			if (this.dataIsReady) {
				let pp = [];
				this.properties.forEach(property => {
					if (property.location.toLowerCase().search(area.toLowerCase()) !== -1) {
						pp.push(property);
					}
				});
				return pp;
			}
		}
	},
	beforeRouteEnter (to, from, next) {
		let db = firebase.firestore();
		(async () => {
			try {
				let dataSnapshot = await db.collection('property').get();
				next(vm => {
					dataSnapshot.forEach(doc => {
						let property = doc.data();
						property.id = doc.id;
						vm.dataIsReady = true;
						vm.load(false);
						vm.properties.push(property);
					});
				});
			} catch (error) {
				console.log(error);
				next(vm => {
					vm.load(false);
					vm.showSnackbar('Error loading resource. Try again later.');
				});
			}
		})();
	},
	mounted () {

	}
}
</script>
