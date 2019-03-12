<template>
	<v-slide-x-transition>
		<v-container fill-height fluid class="pa-0">
			<v-layout fill-height align-center justify-center class="white">
				<v-container grid-list-md>
					<v-layout row wrap>
						<v-flex xs12 lg4>
							<v-select
								:items="type"
								label="Property Type"
								solo
							></v-select>
						</v-flex>
						<v-flex xs12 lg4>
							<v-select
								:items="offer"
								label="Offer Type"
								solo
							></v-select>
						</v-flex>
						<v-flex xs12 lg4>
							<v-select
								:items="location"
								label="Location"
								solo
							></v-select>
						</v-flex>
					</v-layout>
					<v-flex xs12>
						<v-btn block color="red darken-3" class="white--text">Search with filter</v-btn>
					</v-flex>
				</v-container>
			</v-layout>
		</v-container>
	</v-slide-x-transition>
</template>

<script>
export default {
	data () {
		return {
			type: [
				'All',
				'Flats',
				'House',
				'Land',
				'Office',
			],
			offer: [
				'All',
				'For sale',
				'For rent'
			],
			location: [
				'All',
				'Abuja',
				'Ikoyi',
				'Lagos Island',
				'Lagos Mainland',
				'Lekki Pennisula',
				'Victoria Island',
				'Others'
			]
		}
	}
}
</script>
