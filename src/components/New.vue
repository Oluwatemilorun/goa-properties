<template>
	<v-slide-x-transition>
  		<v-stepper v-model="step" vertical non-linear class="elevation-0 pa-0 ma-0">
			<v-stepper-step color="red darken-3" step="1">
				About Property
				<small>Details about property</small>
			</v-stepper-step>
			<v-stepper-content step="1">
				<v-container grid-list-md fluid pa-0>
					<v-form v-model="validated">
						<v-layout row wrap>
							<v-flex xs12>
								<v-text-field
									v-model="propertyName"
									label="Name of Property"
									id="name_property"
									style="font-size: 25px; font-weight: 400"
									height="35"
									color="red darken-3"
									:rules="fieldRule"
									required
								></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-textarea
									v-model="propertyDescription"
									label="Property Description"
									id="description_property"
									color="red darken-3"
									:rules="fieldRule"
								></v-textarea>
							</v-flex>
							<v-flex xs12>
								<v-select
									:items="propertyTypes"
									v-model="propertyType"
									label="Property Type"
									color="red darken-3"
									:rules="fieldRule"
								></v-select>
							</v-flex>
							<v-flex xs8>
								<v-text-field
									v-model="propertyAskingPrice"
									label="Asking Price/Rent"
									id="price_property"
									prefix="₦"
									color="red darken-3"
									:rules="fieldRule"
									required
								></v-text-field>
							</v-flex>
							<v-flex xs4>
								<v-select
									:items="['Week', 'Month', 'Year']"
									v-model="propertyAskingPrice_per"
									label="Per"
									color="red darken-3"
									:rules="fieldRule"
								></v-select>
							</v-flex>
							<v-flex xs8>
								<v-text-field
									v-model="propertyServiceCharge"
									label="Service Charge"
									id="service_charge_property"
									prefix="₦"
									color="red darken-3"
									:rules="fieldRule"
									required
									value="Nill"
								></v-text-field>
							</v-flex>
							<v-flex xs4>
								<v-select
									:items="['Week', 'Month', 'Year']"
									v-model="propertyServiceCharge_per"
									label="Per"
									color="red darken-3"
									:rules="fieldRule"
								></v-select>
							</v-flex>
							<v-flex xs12 style="position: relative;">
								<p>Property cover picture</p>
								<label for="category-cover">
									<div v-if="isUploading" class="progress-wrapper">
										<v-progress-circular indeterminate color="secondary"></v-progress-circular>
									</div>
									<v-tooltip bottom>
										<img id="category-cover-preview" slot="activator" src="@/assets/upload.png" alt="cover" style="width: 100%; height: 200px">
										<span>Upload cover photo</span>
									</v-tooltip>
									<input type="file" name="cover" id="category-cover" accept="image/*" hidden @change="previewCover($event)">
								</label>
							</v-flex>
						</v-layout>
					</v-form>
				</v-container>
				<v-btn color="accent" :disabled="!validated" :loading="isSaving" @click="saveStep(1)">Save & continue</v-btn>
			</v-stepper-content>

			<v-stepper-step color="red darken-3" :editable="willEdit" step="2">
				Property Location
				<small>Details on locating property</small>
			</v-stepper-step>
			<v-stepper-content step="2">
				<v-container grid-list-lg fluid wrap pa-0 my-2>
					<v-layout row wrap>
						<v-flex xs12>
							<v-text-field
								v-model="propertyLocation"
								label="Location"
								id="location_property"
								color="red darken-3"
								@input="loadmap(0, 'geocode')"
							></v-text-field>
						</v-flex>
						<v-flex xs6>
							<v-text-field
								v-model="propertyCoordinates.lng"
								label="Longitude"
								id="lng_property"
								suffix="º E"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs6>
							<v-text-field
								v-model="propertyCoordinates.lat"
								label="Latitude"
								id="lng_property"
								suffix="º N"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-combobox
								v-model="propertyLandmarks"
								label="Landmarks (hit enter to tag landmark)"
								chips
								clearable
								multiple
								color="secondary"
							>
								<template slot="selection" slot-scope="data">
									<v-chip
										:selected="data.selected"
										close
										@input="remove(data.item)"
									>
										<strong>{{ data.item }}</strong>
									</v-chip>
								</template>
							</v-combobox>
						</v-flex>
						<v-flex xs12>
							<v-checkbox label="Allow coordinates to determine address" v-model="coorWatch" :value="false" color="secondary"></v-checkbox>
							<v-card color="grey lighten-4" height="250">
								<v-layout justify-center align-center fill-height id="preview-map"></v-layout>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
				
				<v-btn color="accent" :loading="isSaving" @click="saveStep(2)">Save & continue</v-btn>
			</v-stepper-content>

			<v-stepper-step color="red darken-3" :editable="willEdit" step="3">
				Inspection Information
				<small>Information gotten from inspection carried out</small>
			</v-stepper-step>
			<v-stepper-content step="3">
				<v-layout row d-block my-2>
					<v-flex xs12>
						<p class="">Finishing</p>
						<v-radio-group v-model="propertyFinishing_state" row class="mx-3">
							<v-radio label="Standard" color="red darken-3" value="standard"></v-radio>
							<v-radio label="Luxury" color="red darken-3" value="luxury"></v-radio>
						</v-radio-group>
					</v-flex>
					<v-flex xs12>
						<p class="">State of Repairs</p>
						<v-radio-group v-model="propertyRepair_state" row class="mx-3">
							<v-radio label="Good" color="red darken-3" value="good"></v-radio>
							<v-radio label="Fair" color="red darken-3" value="fair"></v-radio>
							<v-radio label="Poor" color="red darken-3" value="poor"></v-radio>
						</v-radio-group>
					</v-flex>
					<v-flex xs12>
						<v-textarea
							v-model="propertyRepair_description"
							label="Repair Work Needed"
							id="repair_description"
							color="red darken-3"
							height="60"
						></v-textarea>
					</v-flex>
				</v-layout>

				<v-btn color="accent" :loading="isSaving" @click="saveStep(3)">Save & continue</v-btn>
			</v-stepper-content>

			<v-stepper-step color="red darken-3" :editable="willEdit" step="4">
				Adminstrative Information
			</v-stepper-step>
			<v-stepper-content step="4">
				<v-container grid-list-md fluid pa-0>
					<v-layout row wrap>
						<v-flex xs12>
							<v-text-field
								v-model="propertyOwner"
								label="Name of Owner"
								id="owner_property"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								v-model="propertyStaff_instruction"
								label="Staff who brought in instruction"
								id="staff_instruction_property"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								v-model="propertyStaff_contactClient"
								label="Staff in contact with client"
								id="staff_contact_property"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								v-model="dateInstruction"
								name="date"
								label="Date of Instruction"
								id="date_property"
								@focus="dateDialog = true"
							></v-text-field>
							<v-dialog
								v-model="dateDialog"
								max-width="300px"
								transition="dialog-transition"
							>
								<v-date-picker full-width  color="red darken-3" header-color="secondary" v-model="dateInstruction"></v-date-picker>
							</v-dialog>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								v-model="propertyVacantUnit"
								label="No. of Vacant Units"
								id="vacant_unit_property"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								v-model="propertyTenants"
								label="No. of Tenants"
								id="vacant_unit_property"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								v-model="propertyStaff_siteClient"
								label="Contact of On-site Staff"
								id="contact_site_property"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								v-model="propertyStaff_inspection"
								label="Contact for Inspection"
								id="contact_inspection_property"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<p class="">Banner Status</p>
							<v-radio-group v-model="banner_state" row class="mx-3">
								<v-radio label="Yes" color="red darken-3" value="yes"></v-radio>
								<v-radio label="No" color="red darken-3" value="no"></v-radio>
							</v-radio-group>
						</v-flex>
						<v-flex xs12>
							<p class="">Are keys available in the office?</p>
							<v-radio-group v-model="keys_state" row class="mx-3">
								<v-radio label="Yes" color="red darken-3" value="yes"></v-radio>
								<v-radio label="No" color="red darken-3" value="no"></v-radio>
							</v-radio-group>
						</v-flex>
						<v-flex xs12>
							<p class="">Availabilty of Instruction Letter</p>
							<v-radio-group v-model="letter_state" row class="mx-3">
								<v-radio label="Yes" color="red darken-3" value="yes"></v-radio>
								<v-radio label="No" color="red darken-3" value="no"></v-radio>
							</v-radio-group>
						</v-flex>
						<v-flex xs12>
							<p class="">Is this property available?</p>
							<v-radio-group v-model="isAvailable" row class="mx-3">
								<v-radio label="Yes" color="red darken-3" :value="true"></v-radio>
								<v-radio label="No" color="red darken-3" :value="false"></v-radio>
							</v-radio-group>
						</v-flex>
					</v-layout>
				</v-container>

				<v-btn color="accent" :loading="isSaving" @click="saveStep(4)">Save</v-btn>
			</v-stepper-content>

			<v-stepper-step color="red darken-3" step="5" :editable="willEdit">
				Property Characteristics
				<small>Measurements and other features of property</small>
			</v-stepper-step>
			<v-stepper-content step="5">
				<v-container grid-list-md fluid pa-0>
					<v-layout row wrap>
						<v-flex xs6>
							<v-text-field
								v-model="propertyLandSize"
								label="Land Size"
								color="red darken-3"
								type="number"
								mask="#"
							></v-text-field>
						</v-flex>
						<v-flex xs6>
							<v-text-field
								v-model="property_noUnits"
								label="No of Units"
								color="red darken-3"
								type="number"
								mask="#"
							></v-text-field>
						</v-flex>
						<v-flex xs6>
							<v-text-field
								v-model="property_noBlocks"
								label="No of Blocks"
								color="red darken-3"
								type="number"
								mask="#"
							></v-text-field>
						</v-flex>
						<v-flex xs6>
							<v-text-field
								v-model="property_noFloors"
								label="No of Floors"
								color="red darken-3"
								type="number"
								mask="#"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<p>Tick as appropirate</p>
							<v-checkbox v-model="propertyFeatures" class="ma-0 pa-0" label="Swimming pool" value="swimming pool"></v-checkbox>
							<v-checkbox v-model="propertyFeatures" class="ma-0 pa-0" label="Elevator" value="elevator"></v-checkbox>
							<v-checkbox v-model="propertyFeatures" class="ma-0 pa-0" label="Car park" value="car park"></v-checkbox>
							<v-checkbox v-model="propertyFeatures" class="ma-0 pa-0" label="Roof terrace" value="roof terrace"></v-checkbox>
							<v-checkbox v-model="propertyFeatures" class="ma-0 pa-0" label="Café" value="café"></v-checkbox>
							<v-checkbox v-model="propertyFeatures" class="ma-0 pa-0" label="Kitchenette" value="kittchenette"></v-checkbox>
							<v-checkbox v-model="propertyFeatures" class="ma-0 pa-0" label="Toilets" value="toilets"></v-checkbox>
							<v-checkbox v-model="propertyFeatures" class="ma-0 pa-0" label="Banking halls" value="banking halls"></v-checkbox>
							<v-checkbox v-model="propertyFeatures" class="ma-0 pa-0" label="Receptionist desk" value="receptionist desk"></v-checkbox>
						</v-flex>
						<v-flex xs12>
							<v-btn block color="primary" dark>Upload floor plans (PDF)</v-btn>
						</v-flex>
					</v-layout>
				</v-container>
				<v-btn color="accent" :loading="isSaving" @click="saveStep(5)">Save</v-btn>
			</v-stepper-content>

			<v-stepper-step color="red darken-3" step="6" :editable="willEdit">
				Property History
				<small>Brief history ofproperty</small>
			</v-stepper-step>
			<v-stepper-content step="6">
				<v-container grid-list-md fluid pa-0>
					<v-layout row wrap>
						<v-flex xs12>
							<v-text-field
								v-model="previousOwner"
								label="Previous Owner / Landlord"
								color="red darken-3"
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
								v-model="previousOccupant"
								label="Previous Occupant / Tenant"
								color="red darken-3"
							></v-text-field>
						</v-flex>
					</v-layout>
				</v-container>
			</v-stepper-content>

			<v-stepper-step color="red darken-3" step="7" :editable="willEdit">
				Picture Gallery
				<small>Upload pictures of property</small>
			</v-stepper-step>
			<v-stepper-content step="7">
				<v-container grid-list-md fluid pa-0>
					<v-layout row wrap>
						<v-flex xs6>
							<v-card>
								
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-stepper-content>
		</v-stepper>
	</v-slide-x-transition>
</template>


<script>

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

export default {
	props: ['showSnackbar'],
	data () {
		return {
			validated: false,
			step: 0,
			willEdit: false,
			isSaving: false,
			coorWatch: false,
			dateInstruction: '',
			dateDialog: '',
			isUploading: false,
			uploadSuccess: false,
			fieldRule: [
				v => !!v || 'This field is required'
			],
			finishing_state: '',
			keys_state: '',
			letter_state: '',
			propertyId: '',
			propertyName: '',
			propertyDescription: '',
			propertyCover: '',
			propertyAskingPrice: '',
			propertyAskingPrice_per: 'Year',
			propertyServiceCharge: '',
			propertyServiceCharge_per: 'Month',
			propertyLocation: '',
			propertyLandmarks: [],
			propertyCoordinates: {
				lat: 0,
				lng: 0
			},
			propertyType: '',
			propertyTypes: [
				'Flats',
				'House',
				'Land',
				'Office',
			],
			propertyFinishing_state: '',
			propertyRepair_state: '',
			propertyRepair_description: '',
			propertyOwner: '',
			propertyStaff_instruction: '',
			propertyStaff_contactClient: '',
			isAvailable: false,
			banner_state: '',
			propertyVacantUnit: '',
			propertyTenants: '',
			propertyStaff_siteClient: '',
			propertyStaff_inspection: '',
			propertyLandSize: '',
			propertyFeatures: [],
			property_noUnits: 0,
			property_noBlocks: 0,
			property_noFloors: 0,
			previousOwner: '',
			previousOccupant: '',
		}
	},
	methods: {
		previewCover (e) {
			let reader = new FileReader();
			reader.onload = () => {
				let output = document.getElementById('category-cover-preview');
				output.src = reader.result;
			}
			reader.readAsDataURL(e.target.files[0]);
			this.uploadCover();
		},
		remove (item) {
			this.propertyLandmarks.splice(this.propertyLandmarks.indexOf(item), 1)
			this.propertyLandmarks = [...this.propertyLandmarks]
		},
		loadmap (LatLng, loadType) {
			if (!loadType) loadType = 'coord';

			const element = document.getElementById('preview-map');
			const options = {
				zoom: 20,
			}

			const geocoder = new google.maps.Geocoder();
			const map = new google.maps.Map(element, options);
			
			let renderMarker = (position) => {
				let marker = new google.maps.Marker({ 
					position,
					map,
					animation: google.maps.Animation.DROP,
					draggable: true,
				});

				google.maps.event.addListener(marker, 'drag', () => {
					let newPosition = marker.getPosition();
					this.propertyCoordinates.lat = newPosition.lat();
					this.propertyCoordinates.lng = newPosition.lng();
					map.setCenter(newPosition);
				});
			}
			
			switch (loadType) {
				case 'coord':
					// geolocation
					this.propertyCoordinates.lng = LatLng.coords.longitude;
					this.propertyCoordinates.lat = LatLng.coords.latitude;

					const position = new google.maps.LatLng(this.propertyCoordinates.lat, this.propertyCoordinates.lng);
					map.setCenter(position);
					renderMarker(position);

					let latlng = { lat: this.propertyCoordinates.lat, lng: this.propertyCoordinates.lng };
					geocoder.geocode({ 'location': latlng }, (results, status) => {
						if (status === 'OK') {
							if (results[0] && this.coorWatch) {
								this.propertyLocation = results[0].formatted_address;
							}
							else {
								this.showSnackbar('Error getting location address');
							}
						}
						else {
							console.log(status);
							this.showSnackbar('Error getting location address');
						}
					});

					break;

				case 'geocode':
					// geocoding
					geocoder.geocode( { 'address': this.propertyLocation}, (results, status) => {
						if (status == 'OK') {
							map.setCenter(results[0].geometry.location);
							renderMarker(results[0].geometry.location);

							this.propertyCoordinates.lat = results[0].geometry.location.lat();
							this.propertyCoordinates.lng = results[0].geometry.location.lng();
						}
						else {
							console.log(status);
							this.showSnackbar('Error loading map. Location not found.');
						}
					});

					break
			
				default:
					break;
			}
			
		},
		saveStep (step) {
			const db = firebase.firestore()
			switch (step) {
				case 1:
					if (!this.uploadSuccess) {
						this.showSnackbar('Please add a cover for this property');
						return;
					}
					this.isSaving = true;
					db.collection("property").add({
						name: this.propertyName,
						description: this.propertyDescription,
						type: this.propertyType,
						askingPrice: `${this.propertyAskingPrice}/${this.propertyAskingPrice_per}`,
						serviceCharge: `${this.propertyServiceCharge}/${this.propertyServiceCharge_per}`,
						cover: this.propertyCover || '/static/img/cover.png'
					})
					.then((ref) => {
						this.isSaving = false;
						this.willEdit = true;
						this.propertyId = ref.id;
						this.showSnackbar('Property added successfully');
						this.step = 2;
					})
					.catch((error) => {
						console.error("Error writing document: ", error);
						this.showSnackbar('Error adding property');
					});

					break;

				case 2:
					this.isSaving = true;
					db.collection('property').doc(this.propertyId).set({
						location: this.propertyLocation,
						landmarks: this.propertyLandmarks,
						coordinates: this.propertyCoordinates
					}, { merge: true })
					.then(() => {
						this.isSaving = false;
						this.showSnackbar('Property updated successfully');
						this.step = 3;
					})
					.catch((err) => {
						this.isSaving = false;
						this.showSnackbar('Error adding property');
						console.log(err);
					});

					break;
				
				case 3:
					this.isSaving = true;
					db.collection('property').doc(this.propertyId).set({
						repair_state: this.propertyRepair_state,
						finishing_state: this.finishing_state,
						repair_description: this.propertyRepair_description,
						
					}, { merge: true })
					.then(() => {
						this.isSaving = false;
						this.showSnackbar('Property updated successfully');
						this.step = 4
					})
					.catch(err => {
						this.isSaving = false;
						this.showSnackbar('Error adding property');
						console.log(err);
					});
				
				case 4:
					this.isSaving = true;
					db.collection('property').doc(this.propertyId).set({
						propertyOwner: this.propertyOwner,
						propertyStaff_instruction: this.propertyStaff_instruction,
						propertyStaff_contactClient: this.propertyStaff_contactClient,
						banner_state: this.banner_state,
						propertyVacantUnit: this.propertyVacantUnit,
						propertyTenants: this.propertyTenants,
						keys_state: this.keys_state,
						letter_state: this.letter_state,
						instruction_staff: this.propertyStaff_instruction,
						contactCLient_staff: this.propertyStaff_contactClient,
						siteClient_staff: this.propertyStaff_siteClient,
						inspection_staff: this.propertyStaff_inspection,
						isAvailable: this.isAvailable
					}, {merge: true })
					.then(() => {
						this.isSaving = false;
						this.showSnackbar('Property updated successfully');
						this.step = 5;
					})
					.catch(err => {
						this.isSaving = false;
						this.showSnackbar('Error adding property');
						console.log(err);
					});
					break;

				case 5:
					this.isSaving = true;
					db.collection('property').doc(this.propertyId).set({
						propertyLandSize: this.propertyLandSize,
						propertyFeatures: this.propertyFeatures,
						previousOccupant: this.previousOccupant,
						property_noUnits: this.property_noUnits,
						property_noBlocks: this.property_noBlocks,
						property_noFloors: this.property_noFloors,
					}, {merge: true })
					.then(() => {
						this.isSaving = false;
						this.showSnackbar('Property updated successfully');
						this.step = 6;
					})
					.catch(err => {
						this.isSaving = false;
						this.showSnackbar('Error adding property');
						console.log(err);
					});
					break;

				case 6:
					this.isSaving = true;
					db.collection('property').doc(this.propertyId).set({
						previousOwner: this.previousOwner,
						previousOccupant: this.previousOccupant,
					}, { merge: true })
					.then(() => {
						this.isSaving = false;
						this.showSnackbar('Property updated successfully');
						// this.step = 6;
					})
					.catch(err => {
						this.isSaving = false;
						this.showSnackbar('Error adding property');
						console.log(err);
					});
					break;
			
				default:
					break;
			}
		},
		uploadCover () {
			this.isUploading = true;
			let auth = firebase.auth();
			let storageRef = firebase.storage().ref();
			let file = document.getElementById('category-cover').files[0];
			let metadata = {
				'contentType': file.type
			};

			storageRef.child('property_cover_images/' + file.name).put(file, metadata)
				.then(snapshot => {
					console.log('uploaded', snapshot.totalBytes, 'bytes.');
					console.log('file metadata', snapshot.metadata);

					snapshot.ref.getDownloadURL()
						.then(url => {
							this.propertyCover = url;
							this.uploadSuccess = true;
							this.isUploading = false;
						});
				})
				.catch(err => {
					console.log(err);
					// this.isUploading = false;
					this.showSnackbar('Error occured while uploading cover');
				});
		}
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
			// check for location
			if (navigator.geolocation) {
				// navigator.geolocation.getCurrentPosition(vm.loadmap, (err) => {
				// 	console.log(err);
				// 	vm.showSnackbar('Can\'t get your location.');
				// });
			}
			else {
				vm.showSnackbar('Can\'t get your location, GPS unavailable');
			}
			
		});
	},
	beforeRouteUpdate (to, from, next) {
		// check for location
		if (navigator.geolocation) {
			// navigator.geolocation.getCurrentPosition(this.loadmap, (err) => {
			// 	console.log(err);
			// 	this.showSnackbar('Can\'t get your location.');
			// });
		}
		else {
			this.showSnackbar('Can\'t get your location, GPS unavailable');
		}

		next();
	}
}
</script>

<style scoped>
.progress-wrapper {
	position: absolute;
    left: 46%;
    top: 50%;
    z-index: 1;
}
</style>
