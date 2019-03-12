<template>
	<v-slide-y-reverse-transition>
		<v-container fluid class="pa-0">
			<v-toolbar dark color="primary" tabs app>
				<v-toolbar-side-icon @click="$router.back()">
					<v-icon>mdi-arrow-left</v-icon>
				</v-toolbar-side-icon>
				<v-text-field
					v-model="search"
					hide-details
					single-line
					placeholder="Search property, location"
					solo-inverted
					flat
					clearable
					clear-icon="mdi-close-circle"
				></v-text-field>
				<v-menu bottom left dense>
					<v-btn
						slot="activator"
						dark
						icon
					>
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>

					<v-list>
						<v-list-tile @click="" >
							<v-list-tile-title>Clear search history</v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
				<v-tabs
					slot="extension"
					v-model="propertyTabs"
					color="transparent"
					slider-color="accent"
					grow
				>
					<v-tab ripple>
						Recent
					</v-tab>
					<v-tab ripple>
						Property
					</v-tab>
					<v-tab ripple>
						location
					</v-tab>
				</v-tabs>
			</v-toolbar>
			<v-content>
				<v-tabs-items>
					<v-tab-item>
						
					</v-tab-item>
				</v-tabs-items>
			</v-content>
		</v-container>
	</v-slide-y-reverse-transition>
</template>

<script>
export default {
	props: [],
	data () {
		return {
			search: ''
		}
	}
}
</script>

