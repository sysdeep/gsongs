<template>
	<div class="card">
		
		
		<div class="card-header">
			Песни исполнителя:

			<span v-if="!singer">нет исполнителя</span>
			<span v-if="singer">
				<router-link :to="/singer/ + singer.id" title="перейти на страницу исполнителя">
					{{ singer.name }}
				</router-link>
				<span class="pull-right badge badge-secondary">{{ singer_songs.length }}</span>
			</span>

		</div>
		

		<div class="input-group">
			<input type="text" class="form-control" v-model="song_filter" placeholder="быстрый поиск">
			<div class="input-group-append">
				<button class="btn btn-outline-secondary" type="button" @click="song_filter = ''">&nbsp <i class="fa fa-times" aria-hidden="true"></i> &nbsp</button>
				</div>
		</div>

		<Spinner v-if="!singer_loaded" />

		<br>

		<ul class="list-unstyled1">
			<li v-for="(song, i) in filtered_songs" :key="i">
				<router-link :to="/song/ + song.id" title="перейти к странице песни">
					{{ song.name }}
				</router-link>
			</li>
		</ul>


	</div>
</template>




<script>
import {mapGetters} from "vuex";
export default {
	// props: ["singer"],

	data: function(){
		return {
			"song_filter"		: "",
		}
	},

	computed: {
		...mapGetters(["singer", "singer_songs", "singer_loaded"]),
	
		// singer_songs(){
		// 	if(this.singer){
		// 		return this.songs.filter(song => song.singer == this.singer.id);
		// 	}
		// 	return [];
		// },

		filtered_songs(){
			let lfind = this.song_filter.toLowerCase();
			return this.singer_songs.filter((item) => {
				let name = item.name.toLowerCase();
				return name.indexOf(lfind) > -1;
			});
		}
	}
}
</script>