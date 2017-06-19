<template>
	<div>
	
		<div class="row">
			<div class="col-md-3">
				<h4 class="page-header">
					Исполнители
					<span class="pull-right badge">{{ state.singers.length }}</span>
				</h4>
	
				<input type="text" class="form-control" v-model="singer_filter" placeholder="быстрый поиск">
	
				<br>
	
				<ul class="list-unstyled">
					<li v-for="singer in filtered_singers">
						<a href="javascript: void(0)" @click="show_songs(singer)" title="отобразить список песенок для этого исполнителя">
							{{ singer.name }}
	
							<i v-if="singer == current_singer" class="fa fa-arrow-left" aria-hidden="true"></i>
						</a>
					</li>
				</ul>
			</div>
	
			<div class="col-md-5">
				<h4 class="page-header">
					Песни исполнителя:
	
					<span v-if="!current_singer">нет исполнителя</span>
					<span v-if="current_singer">
						<router-link :to="/singer/ + current_singer.id" title="перейти на страницу исполнителя">
							{{ current_singer.name }}
						</router-link>
						<span class="pull-right badge">{{ singer_songs.length }}</span>
					</span>
	
				</h4>
	
				<input type="text" class="form-control" v-model="song_filter" placeholder="быстрый поиск">
	
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
import storage from "./storage";
import Q from "q";


function delay() {
	console.log("delay");
	let deferred = Q.defer();

	setTimeout(deferred.resolve, 1000);
	return deferred.promise;
}


export default {
	data: function () {
		return {
			"state"				: storage.state,

			"singer_filter"		: "",
			"song_filter"		: "",

			"current_singer"	: null,
			"singer_songs"		: [],

			"last_songs"		: [],
			"last_songs_count"	: 10
		}
	},

	created: function () {

		storage.need_singers()
			.then(storage.need_songs)
			.then(() => {
				this.state.songs.sort(function (a, b) { return b.id - a.id });
				this.last_songs = this.state.songs.slice(0, this.last_songs_count);
			})


	},

	methods: {
		get_singer_name: function (singer_id) {
			let singer = this.state.singers.find((item) => { return item.id == singer_id })
			return singer ? singer.name : "---"
		},


		show_songs: function (singer) {
			this.current_singer = singer;
			this.singer_songs = this.state.songs.filter((item) => { return item.singer == singer.id });
		}
	},


	computed: {
		filtered_singers: function () {
			let lfind = this.singer_filter.toLowerCase();
			return this.state.singers.filter((item) => {
				let name = item.name.toLowerCase();
				return name.indexOf(lfind) > -1;
			});
		},

		filtered_songs: function () {
			let lfind = this.song_filter.toLowerCase();
			return this.singer_songs.filter((item) => {
				let name = item.name.toLowerCase();
				return name.indexOf(lfind) > -1;
			});
		}
	}


}
</script>