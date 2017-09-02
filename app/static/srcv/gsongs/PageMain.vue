<template>
	<div>
	
		<div class="row">
			<div class="col-md-3">
				<h4 class="page-header">
					Исполнители
					<span class="pull-right badge">{{ singers.length }}</span>
				</h4>
	
				<div class="input-group">
					<input type="text" class="form-control" v-model="singer_filter" placeholder="быстрый поиск">
					<span class="input-group-btn">
        				<button class="btn btn-default" type="button" @click="singer_filter = ''">&nbsp <i class="fa fa-times" aria-hidden="true"></i> &nbsp</button>
      				</span>
				</div>
	
				<br>
	
				<ul class="list-unstyled">
					<li v-for="singer in filtered_singers">
						<a href="javascript: void(0)" @click="select_singer(singer)" title="отобразить список песенок для этого исполнителя">
							<i v-if="singer == current_singer" class="fa fa-arrow-right" aria-hidden="true"></i>

							{{ singer.name }}
	
							
						</a>
					</li>
				</ul>
			</div>
	
			<div class="col-md-5">
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
	
			<div class="col-md-4">
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
		</div>
	
	</div>
</template>


<script>


export default {
	data: function () {
		return {
			"singer_filter"		: "",
			"song_filter"		: "",

			"current_singer"	: null,

			"last_songs_count"	: 10
		}
	},

	created: function () {

		this.$store.dispatch("fetch_singers");
		this.$store.dispatch("fetch_songs");

	},

	methods: {
		get_singer_name: function (singer_id) {
			let singer = this.$store.state.singers.find((item) => { return item.id == singer_id })
			return singer ? singer.name : "---";
		},


		select_singer: function (singer) {
			this.$store.dispatch("select_singer", singer);
			this.current_singer = singer;
		}
	},


	computed: {
		filtered_singers: function () {
			let lfind = this.singer_filter.toLowerCase();
			return this.$store.state.singers.filter((item) => {
			// return this.state.singers.filter((item) => {
				let name = item.name.toLowerCase();
				return name.indexOf(lfind) > -1;
			});
		},

		singer_songs: function(){
			return this.$store.getters.get_current_singer_songs;
		},

		filtered_songs: function () {
			
			
			let lfind = this.song_filter.toLowerCase();
			return this.singer_songs.filter((item) => {
				let name = item.name.toLowerCase();
				return name.indexOf(lfind) > -1;
			});
			
		},


		last_songs: function(){
			let songs_copy = this.$store.state.songs.slice();
			songs_copy.sort(function (a, b) { return b.id - a.id });
			return songs_copy.slice(0, this.last_songs_count);	
		},

		singer: function(){
			return this.$store.state.singer;
		},

		singers: function(){
			return this.$store.state.singers;	
		}
	}


}
</script>