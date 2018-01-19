<template>
	<div>
		

		<h4 class="page-header">
			Песни исполнителя:

			<span v-if="!singer">нет исполнителя</span>
			<span v-if="singer">
				<router-link :to="/singer/ + singer.id" title="перейти на страницу исполнителя">
					{{ singer.name }}
				</router-link>
				<span class="pull-right badge">{{ singer_songs.length }}</span>
			</span>

		</h4>
		

		<div class="input-group">
			<input type="text" class="form-control" v-model="song_filter" placeholder="быстрый поиск">
			<span class="input-group-btn">
				<button class="btn btn-default" type="button" @click="song_filter = ''">&nbsp <i class="fa fa-times" aria-hidden="true"></i> &nbsp</button>
				</span>
		</div>


		<br>

		<ul class="list-unstyled">
			<li v-for="song in filtered_songs">
				<router-link :to="/song/ + song.id" title="перейти к странице песни">
					{{ song.name }}
				</router-link>
			</li>
		</ul>


	</div>
</template>




<script>
export default {

	data: function(){
		return {
			"song_filter"		: "",
		}
	},

	computed: {
		singer: function(){
			return this.$store.state.singer;
		},


		singer_songs: function(){
			return this.$store.getters.get_current_singer_songs;
		},

		filtered_songs: function(){
			let lfind = this.song_filter.toLowerCase();
			return this.singer_songs.filter((item) => {
				let name = item.name.toLowerCase();
				return name.indexOf(lfind) > -1;
			});
		}
	}
}
</script>