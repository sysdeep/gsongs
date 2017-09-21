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
				<variants></variants>
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
			"chords"		: []
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




		on_select_group: function(group_name){
			console.log(group_name);
			net.get_chords_group(group_name).then(response => {
				// console.log(response.data);
				this.chords = response.data.chords;
			})
		},

		on_select_chord: function(chord_name){
			console.log(chord_name);
		}
	},

	computed: {
		
	}

}
</script>

<style>

</style>
