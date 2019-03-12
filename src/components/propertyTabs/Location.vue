<template>
	<v-container fluid fill-height>
		<v-layout fill-height column align-content-start>
			<v-flex xs12>
				<v-card height="300" color="grey lighten-4" flat>
					<v-layout justify-center align-center fill-height id="preview-map"></v-layout>
				</v-card>
			</v-flex>
			<v-flex xs12>
				<p class="subheading font-weight-medium mt-2 ma-0">Location</p>
				<p class="headline font-weight-thin pt-1">{{ property.location }}</p>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Latitude</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.coordinates.lat }} </span>
					<v-btn icon ripple class="right">
						<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
					</v-btn>
				</div>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Longitude</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.coordinates.lng }} </span>
					<v-btn icon ripple class="right">
						<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
					</v-btn>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	props: ['property'],
	data () {
		return {
			map: {}
		}
	},
	methods: {
		async loadMap () {
			const element = document.getElementById('preview-map');
			
			try {
				let map = await new google.maps.Map(element, {
					zoom: 18,
					center: {lat: this.property.coordinates.lat, lng: this.property.coordinates.lng}
				});

				let latLng = new google.maps.LatLng(this.property.coordinates.lat, this.property.coordinates.lng);

				let marker = new google.maps.Marker({
					position: latLng,
					map: map,
				});

				this.map = map;
				this.mapMustReload = false;

				return Promise.resolve('loaded');
			} catch (error) {
				console.log(error);
				return Promise.reject(error);
			}
		},
	},
	mounted () {
		this.loadMap().then(() => {
			this.mapMustReload = false;
		})
		.catch(err => {
			this.mapMustReload = true;
		})
	}
}
</script>
