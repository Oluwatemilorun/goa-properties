<template>
	<v-container fluid fill-height>
		<v-layout fill-height column align-content-start>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Property Owner</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.propertyOwner || '- -' }} </span>
					<v-btn icon ripple class="right">
						<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
					</v-btn>
				</div>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Banner State</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.banner_state || '- -' }} </span>
					<v-btn icon ripple class="right">
						<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
					</v-btn>
				</div>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Are keys available in the office?</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.keys_state || '- -' }} </span>
					<v-btn icon ripple class="right">
						<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
					</v-btn>
				</div>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Availabilty of Instruction Letter</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.letter_state || '- -' }} </span>
					<v-btn icon ripple class="right">
						<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
					</v-btn>
				</div>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Is this property available?</div>
				<div class="layout">
					<v-chip label small class="right" :color="property.isAvailable ? 'green' : 'red'" text-color="white">{{ property.isAvailable ? 'Available' : 'Unavailable' }}</v-chip>
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

<style>

</style>