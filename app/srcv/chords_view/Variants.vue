<template>
	<div>

		<h4 class="page-header">Variants for {{ chord }}</h4>

		<ul class="list-unstyled">
			<li v-for="(item, index) in items" :key="index">
				<!-- {{ item }} -->
				<gchord :item="item"></gchord>
			</li>
		</ul>


	</div>
</template>

<script>

import component_chord from "./CChord.vue";


export default {

	props: ["items", "chord"],

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
