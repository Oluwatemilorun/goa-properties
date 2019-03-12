<template>
	<v-slide-y-reverse-transition>
		<v-container wrap class="pa-0">
			<div v-if="($vuetify.breakpoint.smAndDown && !isPotrait) || $vuetify.breakpoint.smAndUp">
				<v-navigation-drawer
					app
					v-model="drawer"
					light width="300"
					fixed :permanent="drawer"
				>
					 <v-card height="300" flat>
						<v-img
							class="white--text"
							height="200px"
							:src="cProperty.cover"
						>
							<v-container fill-height fluid class="pa-2">
								<v-layout fill-height>
									<v-flex xs12>
										<v-toolbar dense fixed style="top: 8px; left: 8px; right: 8px; width: auto">
											<v-toolbar-title>{{ cProperty.name }}</v-toolbar-title>
											<v-spacer></v-spacer>
											<v-btn icon light :loading="loadingDirections" @click.stop="drawer = false">
												<v-icon>mdi-close</v-icon>
											</v-btn>
										</v-toolbar>
									</v-flex>
								</v-layout>
							</v-container>
							<v-layout
								slot="placeholder"
								fill-height
								align-center
								justify-center
								ma-0
							>
								<v-progress-circular indeterminate color="primary"></v-progress-circular>
							</v-layout>
						</v-img>
						<div class="pa-2 layout align-center">
							<span class="grey--text text-capitalize">{{ cProperty.type }}</span>
							<v-spacer></v-spacer>
							<v-chip label small class="right" :color="cProperty.isAvailable ? 'green' : 'red'" text-color="white">{{ cProperty.isAvailable ? 'Available' : 'Unavailable' }}</v-chip>
						</div>
						<v-card-title class="pa-2">
							<div>
								<span>{{ cProperty.description }}</span>
							</div>
						</v-card-title>
					</v-card>

					<v-divider></v-divider>
					<v-layout row wrap  justify-space-between class="pa-2">
						<v-flex xs4 @click="getDirections(cProperty.coordinates)">
							<v-btn
								slot="activator"
								icon
								class="mx-auto d-block"
								:loading="loadingDirections"
							>
								<v-icon color="black">mdi-directions</v-icon>
							</v-btn>
							<div class="text-xs-center">Get <br> Directions</div>
						</v-flex>
						<v-flex xs4>
							<v-btn
								slot="activator"
								icon
								class="mx-auto d-block"
							>
								<v-icon color="black">mdi-pencil</v-icon>
							</v-btn>
							<div class="text-xs-center">Edit <br> Property</div>
						</v-flex>
						<v-flex xs4>
							<v-btn
								slot="activator"
								icon
								class="mx-auto d-block"
							>
								<v-icon color="black">mdi-delete</v-icon>
							</v-btn>
							<div class="text-xs-center">Delete <br> Property</div>
						</v-flex>
					</v-layout>
					<v-divider></v-divider>

					<v-layout row wrap :style="{ height: directionsReady ? '150px' : '0px' }">
						<div id="directions-display" class="directions-display"></div>
						<v-divider></v-divider>
					</v-layout>

					<v-layout row wrap class="pa-2">
						<v-flex xs12 class="mb-2">
							<div class="caption grey--text">Property</div>
							<div class="layout">
								<span class="body-1 mr-auto">{{ cProperty.name }} </span>
								<v-btn small icon ripple class="right">
									<v-icon small color="grey lighten-1">mdi-content-copy</v-icon>
								</v-btn>
							</div>
						</v-flex>
						<v-flex xs12 class="mb-2">
							<div class="caption grey--text">Location</div>
							<div class="layout">
								<span class="body-1 mr-auto">{{ cProperty.location }} </span>
								<v-btn small icon ripple class="right">
									<v-icon small color="grey lighten-1">mdi-content-copy</v-icon>
								</v-btn>
							</div>
						</v-flex>
						<v-flex xs12 class="mb-2">
							<div class="caption grey--text">Coordinates</div>
							<div class="layout">
								<span class="body-1 mr-auto">
									Latitude: {{ cProperty.coordinates && cProperty.coordinates.lat }} <br>
									Longitude: {{ cProperty.coordinates && cProperty.coordinates.lng }}
								</span>
								<v-btn small icon ripple class="right">
									<v-icon small color="grey lighten-1">mdi-content-copy</v-icon>
								</v-btn>
							</div>
						</v-flex>
					</v-layout>

					<v-layout row wrap class="pa-2">
						<v-divider></v-divider>
						<v-flex xs12>
							<div class="caption grey--text">Landmarks</div>
						</v-flex>
						<v-chip
							v-if="cProperty.landmarks"
							v-for="(landmark, index) in cProperty.landmarks" 
							:key="index" label small
							color="primary" text-color="white" 
							class="text-capitalize"
						> 
							{{ landmark }}
						</v-chip>
					</v-layout>


					<v-layout row wrap style="height: 70px">
						
					</v-layout>
				</v-navigation-drawer>
				<v-content>
					<v-card color="grey lighten-4" :height="$vuetify.clientHeight" flat>
						<v-layout justify-center align-center fill-height id="preview-map"></v-layout>
						<!-- 
							lat 6°34'13.80"N
							lng  3°36'2.70"E
						-->
					</v-card>
					<v-fab-transition>
						<v-speed-dial
							v-if="showFab"
							v-model="fab"
							bottom app
							left fixed
							transition="slide-y-reverse-transition"
						>
							<v-btn
								slot="activator"
								v-model="fab"
								color="primary"
								dark
								fab
							>
								<v-icon>mdi-dots-horizontal</v-icon>
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<v-tooltip v-model="fab" right nudge-top="15">
								<v-btn
									slot="activator"
									fab light
									small
									color="accent"
								>
									<v-icon color="black">mdi-settings</v-icon>
								</v-btn>
								<span>Map settings</span>
							</v-tooltip>
							<v-tooltip v-model="fab" right nudge-top="15">
								<v-btn
									slot="activator"
									fab light
									small
									color="accent"
									@click="$router.back()"
								>
									<v-icon color="black">mdi-arrow-left</v-icon>
								</v-btn>
								<span>Exit map</span>
							</v-tooltip>
						</v-speed-dial>
					</v-fab-transition>
				</v-content>
			</div>

			<div v-else class="portrait-watch">
				<v-layout fill-height row wrap justify-center align-center>
					<div class="pa-4">
						<p class="white--text text-xs-center title">For a better experience, please switch to landscape mode.</p>
						<v-btn outline dark class="d-block mx-auto" @click="$router.back()">exit</v-btn>
					</div>
				</v-layout>
			</div>

			<div v-if="($vuetify.breakpoint.smAndDown && !isPotrait) && mapMustReload" class="portrait-watch">
				<v-layout fill-height row wrap justify-center align-center>
					<div class="pa-4">
						<!-- <p class="white--text text-xs-center title">For a better experience, please switch to landscape mode.</p> -->
						<v-btn outline dark class="d-block mx-auto" @click="reload()">reload map</v-btn>
					</div>
				</v-layout>
			</div>
		</v-container>
	</v-slide-y-reverse-transition>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
	props: ['load', 'showSnackbar'],
	data () {
		return {
			vt: true,
			drawer: false,
			mini: true,
			isPotrait: false,
			fab: false,
			showFab: false,
			map: {},
			mapMustReload: false,
			points: [],
			markers: [],
			cProperty: {},
			userCoordinates: {},
			directionsReady: false,
			loadingDirections: false,
		}
	},
	watch: {
		isPotrait (a, b) {
			if (!a && this.$vuetify.breakpoint.smAndDown) {
				this.mapMustReload = true;
			}
		}
	},
	methods: {
		async loadMap () {
			const element = document.getElementById('preview-map');
			
			try {
				let map = await new google.maps.Map(element, {
					zoom: 11,
					center: {lat: 6.34, lng: 3.36}
				});

				let ctaLayer = await new google.maps.KmlLayer({
					url: 'http://goa.temilorun.com/maps/lagos-boundary.kml',
					map: map
				});

				this.map = map;
				this.mapMustReload = false;

				return Promise.resolve('loaded');
			} catch (error) {
				console.log(error);
				return Promise.reject(error);
			}
		},
		async loadPoints (point) {
			let map = this.map;

			if (point) {
				
			}
			else {
				let db = firebase.firestore();
				let dataSnapshot = await db.collection('property').get();

				await dataSnapshot.forEach(doc => {
					let property = doc.data();

					this.points.push({
						name: property.name,
						type: property.type,
						coord: property.coordinates
					});

					let latLng = new google.maps.LatLng(property.coordinates.lat, property.coordinates.lng);
					let icon = this.getCircle(property.type);

					let marker = new google.maps.Marker({
						position: latLng,
						map: map,
						icon: icon
					});

					marker.addListener('click', () => this.showDrawer(property));

					this.markers.push(marker);
				});
			}
		},
		getDirections (point) {
			this.loadingDirections = true;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((LatLng) => {
					console.log(latLng);

					// geolocation
					this.userCoordinates.lng = LatLng.coords.longitude;
					this.userCoordinates.lat = LatLng.coords.latitude;

					let directionsDisplay = new google.maps.DirectionsRenderer;
					let directionsService = new google.maps.DirectionsService;
					let directionsRequest = {
						origin: new google.maps.LatLng(this.userCoordinates.lat, this.userCoordinates.lng),
						destination: new google.maps.LatLng(this.userCoordinates.lat, this.userCoordinates.lng),
						travelMode: 'DRIVING',
					}

					directionsDisplay.setMap(this.map);
					directionsDisplay.setPanel(document.getElementById('directions-display'));

					directionsService.route(directionsRequest, (response, status) => {
						if (status === 'OK') {
							this.loadingDirections = false;
							this.directionsReady = true;
							directionsDisplay.setDirections(response);
						} else {
							console.log(status);
							this.showSnackbar('Error loading directions. Try again later');
							this.loadingDirections = false;
						}
					});

				}, (err) => {
					console.log(err);
					this.showSnackbar('Error getting your location.');
					this.loadingDirections = false;
				}, { enableHighAccuracy: true });
			}
			else {
				this.showSnackbar('Can\'t get your location, GPS unavailable');
				this.loadingDirections = false;
			}
		},
		reload () {
			this.load(true);
			this.loadMap()
				.then(res => {
					this.showFab = true;
					this.loadPoints() // TODO: check for  query strings
					this.load(false);
				})
				.catch(err => {
					this.load(false);
					this.showSnackbar('Problem loading map. Try again later');
					this.mapMustReload = true;
				});
		},
		removeMarkers (marker) {
			marker.setMap(null);
		},
		getCircle (type) {
			let pt = type.toLowerCase();
			return {
				path: google.maps.SymbolPath.CIRCLE,
				fillColor: 'red',
				fillOpacity: .4,
				// scale: Math.pow(2, magnitude) / 2,
				scale: 20,
				strokeColor: 'white',
				strokeWeight: .5
			};
		},
		showDrawer (property) {
			// console.log(property);
			this.cProperty = property;
			this.drawer = true;
		}
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
			vm.load(true);
			vm.loadMap()
				.then(ans => {
					vm.showFab = true;
					vm.loadPoints() // TODO: check for  query strings
					vm.load(false);
				})
				.catch(err => {
					vm.load(false);
					vm.showSnackbar('Problem loading map. Try again later');
					// vm.$router.back();
					vm.mapMustReload = true;
				});
		});
	},
	beforeRouteUpdate (to, from, next) {
		this.load(true);
		this.loadMap()
			.then(ans => {
				this.showFab = true;
				this.loadPoints() // TODO: check for  query strings
				this.load(false);
				next()
			})
			.catch(err => {
				this.load(false);
				this.showSnackbar('Problem loading map. Try again later');
				this.mapMustReload = true;
				next();
			});
	},
	mounted () {
		if(window.innerHeight > window.innerWidth) this.isPotrait = true;
		else this.isPotrait = false;

		window.addEventListener("orientationchange", () => {
			let windowWidth = window.innerWidth;
			let windowHeight = window.innerHeight
			
			if (windowHeight > windowWidth) this.isPotrait = false;
			else this.isPotrait = true;
		}, false);
	}
}
</script>

<style>
.portrait-watch {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background: rgba(0, 0, 0, 0.5)
}
#directions-display {
	font-family: 'Roboto','sans-serif';
	line-height: 30px;
	padding-left: 10px;	
}

#directions-display select, #directions-display input {
	font-size: 15px;
}

#directions-display select {
	width: 100%;
}

#directions-display i {
	font-size: 12px;
}
#directions-display {
	height: 100%;
	float: right;
	width: 390px;
	overflow: auto;
}
</style>
