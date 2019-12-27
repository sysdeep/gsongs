<template>
	<div>
		

		<h4 class="page-header">
			Песня:

			<!-- <span v-if="!singer">нет исполнителя</span> -->
			<!-- <span v-if="singer"> -->
			<!-- <span>
				<router-link :to="/singer/ + singer.id" title="перейти на страницу исполнителя">
					{{ singer.name }}
				</router-link>
				<span class="pull-right badge">{{ singer_songs.length }}</span>
			</span> -->

		</h4>
		
<pre>
{{ song.text }}
</pre>
		


	</div>
</template>




<script>
export default {

	props: ["song"],

	data: function(){
		return {
			// "song_filter"		: "",
			// "current_song"		: null
		}
	},

	methods: {
		// select_song: function(song){
		// 	this.current_song = song;
		// 	this.$emit("select", song);
		// }
	},

	computed: {
		// singer: function(){
		// 	return this.$store.state.singer;
		// },


		// singer_songs: function(){
		// 	return this.$store.getters.get_current_singer_songs;
		// },

		// filtered_songs: function(){
		// 	// return this.songs;
		// 	let lfind = this.song_filter.toLowerCase();
		// 	return this.songs.filter((item) => {
		// 		let name = item.name.toLowerCase();
		// 		return name.indexOf(lfind) > -1;
		// 	});
		// }
	}
}
</script>