<template>
	<v-container fluid fill-height>
		<v-layout fill-height column align-content-start>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Finishing</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.finishing_state || ' - -' }} </span>
					<v-btn icon ripple class="right">
						<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
					</v-btn>
				</div>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">State of Repairs</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.repair_state || '- -' }} </span>
					<v-btn icon ripple class="right">
						<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
					</v-btn>
				</div>
			</v-flex>
			<v-flex xs12 class="mb-2">
				<div class="subheading grey--text">Repairs Description</div>
				<div class="layout">
					<span class="headline mr-auto">{{ property.repair_description || '- -' }} </span>
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
