<template>
	<div>
		

		<h4 class="page-header">
			Последние добавленные
			<span class="pull-right badge">{{ last_songs.length }}</span>
		</h4>
		<ul>
			<li v-for="song in last_songs">
				<router-link :to="/singer/ + song.singer" title="перейти к странице исполнителя">{{ get_singer_name(song.singer) }}</router-link>
				-
				<router-link :to="/song/ + song.id" title="перейти к странице песни">{{ song.name }}</router-link>
			</li>
		</ul>

	</div>
</template>


<script>
export default {

	data: function(){
		return {
			"last_songs_count"		: 10
		}
	},


	methods: {
		get_singer_name: function(singer_id){
			let singer = this.$store.state.singers.find((item) => { return item.id == singer_id })
			return singer ? singer.name : "---";
		},
	},

	computed: {
		last_songs: function(){
			let songs_copy = this.$store.state.songs.slice();
			songs_copy.sort(function (a, b) { return b.id - a.id });
			return songs_copy.slice(0, this.last_songs_count);	

		}
	}

}
</script>