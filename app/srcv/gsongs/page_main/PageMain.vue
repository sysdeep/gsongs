<template>
	<div>
	
		<div class="row">
			<div class="col-md-3">

				<!-- singers list -->
				<c-singers></c-singers>

			</div>
	
			<div class="col-md-5">
				
				<!-- singer songs list -->
				<c-songs></c-songs>
	
			</div>
	
			<div class="col-md-4">
				
				

				<!-- last -->
				<c-last></c-last>


				<!-- tags -->
				<c-tags></c-tags>



			</div>
		</div>
	
	</div>
</template>


<script>
import component_tags from "./Tags.vue";
import component_singers from "./Singers.vue";
import component_last from "./LastSongs.vue";
import component_songs from "./SingerSongs.vue";



export default {
	data: function () {
		return {
		}
	},

	components: {
		"c-singers"	: component_singers,
		"c-tags"	: component_tags,
		"c-last"	: component_last,
		"c-songs"	: component_songs
	},

	created: function () {

	},

	methods: {

	},



}
</script>