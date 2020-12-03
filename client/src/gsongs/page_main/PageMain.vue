<template>
	<div>
	
		<div class="row">
			<div class="col-md-4">

				<!-- singers list -->
				<!-- <c-singers @select_singer="on_select_singer"></c-singers> -->
				<c-singers />

			</div>
	
			<div class="col-md-4">
				
				<!-- singer songs list -->
				<!-- <c-songs :singer="selected_singer"></c-songs> -->
				<c-songs />
	
			</div>
	
			<div class="col-md-4">
				
				

				

				<!-- <br> -->

				<!-- tags -->
				<c-tags />

				<!-- <br/> -->
				
				<!-- last -->
				<!-- <c-last></c-last> -->



			</div>
		</div>
	
	</div>
</template>


<script>
import component_tags from "./Tags.vue";
import component_singers from "./Singers.vue";
// import component_last from "./LastSongs.vue";
import component_songs from "./SingerSongs.vue";



export default {
	data: function () {
		return {
			// "selected_singer"	: null
		}
	},

	components: {
		"c-singers"	: component_singers,
		"c-tags"	: component_tags,
		// "c-last"	: component_last,
		"c-songs"	: component_songs
	},

	created: function () {

	},

	methods: {
		// on_select_singer(singer){
		// 	this.selected_singer = singer;
		// }
	},



}
</script>