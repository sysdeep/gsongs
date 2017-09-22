<template>
	<div>

		<h3 class="page-header">Chords</h3>



		<div class="row">
			<div class="col-md-3">
				<cgroups :items="cgroups" @selected="on_select_group"></cgroups>
			</div>
			<div class="col-md-3">
				<chords :items="chords" @selected="on_select_chord"></chords>
			</div>
			<div class="col-md-3">
				<variants :items="variants"></variants>
			</div>

		</div>


	</div>
</template>

<script>

import component_cgroups from "./CGroups.vue";
import component_chords from "./Chords.vue";
import component_variants from "./Variants.vue";

import * as net from "./net";

export default {

	components: {
		"cgroups"	: component_cgroups,
		"chords"	: component_chords,
		"variants"	: component_variants
	},

	data: function(){
		return {
			"cgroups"		: [],
			"chords"		: [],
			"variants"		: []
		}
	},

	created: function(){
		this.fetch_groups();
	},

	methods: {
		
		fetch_groups: function(){
			net.get_groups().then(response => {
				// console.log(response.data);
				this.cgroups = response.data.chord_groups;
			})
		},




		on_select_group: function(group_id){
			// console.log(group_id);
			net.get_chords_group(group_id).then(response => {
				// console.log(response.data);
				this.chords = response.data.chords;
			})
		},

		on_select_chord: function(chord_id){
			// console.log(chord_id);
			net.get_variants(chord_id).then(response => {
				this.variants = response.data.variants;
			})
		}
	},

	computed: {
		
	}

}
</script>

<style>

</style>
