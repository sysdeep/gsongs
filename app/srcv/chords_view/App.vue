<template>
	<div>

		<h3 class="page-header">Chords</h3>

		<!-- <c-chord :item="tchord1"></c-chord> -->
		<!-- <c-chord item="6,6,7,8,X,X"></c-chord> -->

		<!-- <button @click="tchord1 = tchord2">q</button> -->


		<div class="row">
			<div class="col-md-3">
				<chords :items="chords" @selected="on_select_chord"></chords>
			</div>
			<div class="col-md-3">
			</div>
			<div class="col-md-3">
				<variants :items="variants" :chord="chord"></variants>
			</div>

		</div>

		<!-- {{chords}} -->


	</div>
</template>

<script>
import axios from "axios";

import component_chords from "./Chords.vue";
import component_variants from "./Variants.vue";

import component_cchord from "./CChord.vue";

import * as net from "./net";

export default {

	components: {
		
		"chords"	: component_chords,
		"variants"	: component_variants,
		"c-chord"	: component_cchord
	},

	data: function(){
		return {
			// "cgroups"		: [],
			"dbase"		: {},
			"chords"	: [],

			"chord"		: "",
			"variants"	: [],
			// "variants"		: []
			// 
			tchord1	: "0,2,2,2,0,X",
			tchord2	: "6,6,7,8,X,X",

		}
	},

	created: function(){
		this.fetch_chords();
	},

	methods: {

		fetch_chords(){
			axios.get("/static/js/chords.json").then(response => {
				this.dbase = response.data;
				this.chords = Object.keys(response.data);
			})
		},


		
		// fetch_groups: function(){
		// 	net.get_groups().then(response => {
		// 		// console.log(response.data);
		// 		this.cgroups = response.data.chord_groups;
		// 	})
		// },




		// on_select_group: function(group_id){
		// 	// console.log(group_id);
		// 	net.get_chords_group(group_id).then(response => {
		// 		// console.log(response.data);
		// 		this.chords = response.data.chords;
		// 	})
		// },

		on_select_chord: function(chord){
			this.chord = chord;
			this.variants = this.dbase[chord];
		}
	},

	computed: {
		
	}

}
</script>

<style>

</style>
