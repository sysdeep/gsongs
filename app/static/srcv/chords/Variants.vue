<template>
	<div>

		<h4 class="page-header">Variants</h4>

		<ul>
			<li v-for="(item, index) in items" :key="index">
				{{ item.body }}
				<gchord :item="item.body"></gchord>
			</li>
		</ul>


	</div>
</template>

<script>

import component_chord from "./Chord.vue";


export default {

	props: ["items"],

	components: {
		"gchord"	: component_chord
	},

	data: function(){
		return {
			
		}
	},

	created: function(){
		
	},

	methods: {
		
	},

	computed: {
		
	}

}
</script>

<style>

</style>
