<template>
	<v-container fluid fill-height>
		<v-layout fill-height column align-content-start>
			<v-flex xs12>
				<v-parallax :src="property.cover" height="200" class="grey lighten-3"></v-parallax>
			</v-flex>
			<v-flex xs12>
				<v-layout row wrap align-center justify-space-between class="mt-1">
					<p class="subheading font-weight-medium ma-0">{{ property.type }}</p>
					<v-chip label small class="right" :color="property.isAvailable ? 'green' : 'red'" text-color="white">{{ property.isAvailable ? 'Available' : 'Unavailable' }}</v-chip>
				</v-layout>
				<p class="headline font-weight-thin pt-1">{{ property.description }}</p>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Landmarks</div>
				<div class="layout">
					<v-chip
						v-if="property.landmarks"
						v-for="(landmark, index) in property.landmarks" 
						:key="index" label
						color="primary" text-color="white" 
						class="text-capitalize"
					> 
						{{ landmark }}
					</v-chip>
				</div>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Asking price</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.askingPrice }} </span>
					<v-btn icon ripple class="right">
						<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
					</v-btn>
				</div>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Serivce charge</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.serviceCharge }} </span>
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
	props: ['property']
}
</script>
