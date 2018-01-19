<template>
	<div>
	
		<div class="row">
			<div class="col-md-3">

				<!-- singers list -->
				<c-singers @select="on_singer_selected"></c-singers>


				<!-- tags -->
				<c-tags></c-tags>

			</div>
	
			<div class="col-md-3">
				
				

				<!-- songs list -->
				<c-songs :songs="ssongs" @select="on_song_selected"></c-songs>
	
			</div>
	
			<div class="col-md-6">
				
				<c-song :song="current_song" v-if="current_song"></c-song>

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
import component_songs from "./Songs.vue";
import component_song from "./Song.vue";



export default {
	data: function () {
		return {
			"current_singer_id"	: null,
			"current_song"	: null
		}
	},

	components: {
		"c-singers"	: component_singers,
		"c-tags"	: component_tags,
		// "c-last"	: component_last,
		"c-songs"	: component_songs,
		"c-song"	: component_song
	},

	created: function () {
		console.log("main2 greated");
	},

	methods: {
		on_singer_selected: function(singer_id){
			this.current_singer_id = singer_id;
			this.current_song = null;
		},


		on_song_selected: function(song){
			this.current_song = song;
		},

	},

	computed: {
		ssongs: function(){
			if(!this.current_singer_id) return [];
			return this.$store.state.songs.filter(song => song.singer == this.current_singer_id);
		}
	}



}
</script>