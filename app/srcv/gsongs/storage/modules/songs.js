import axios from "axios";

const SINGER_NAME_CACHE = {};


export default {
	state: {
		"songs"			: [],
		"songs_loaded"	: false,
	},

	mutations: {
		set_songs: function(state, songs){
			state.songs = songs;
			state.songs_loaded = true;
		},

		set_songs_loaded: (state, value) => state.songs_loaded = value,
	},

	actions: {
		/**
		 * получить список исполнителей
		 */
		fetch_singers: function(context){
			return new Promise((resolve, reject) => {
				context.commit("set_songs_loaded", false);
				axios.get("/api/get_songs").then(response => {
					response.data.songs.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
					context.commit("set_songs", response.data.songs);
					resolve();
				});
			})
		},
	},


	getters: {
		songs: (state) => state.songs,
		songs_loaded: (state) => state.songs_loaded,



		/**
		 * получить список песенок для исполнителя
		 */
		singer_songs: (state, getters) => (singer_id) => {
			return state.songs.filter(song => song.singer == singer_id);
		},

		// /**
		//  * найти имя исполнителя по заданному id
		//  */
		// get_singer_name: (state, getters) => (singer_id) => {
		// 	let cache_result = SINGER_NAME_CACHE[singer_id];
		// 	if(cache_result){
		// 		// console.log("in cache");
		// 		return cache_result;
		// 	}

		// 	let singer = state.singers.find(item => item.id == singer_id);
		// 	if(singer){
		// 		// console.log("add cache");
		// 		SINGER_NAME_CACHE[singer_id] = singer.name;
		// 	}
		// 	return singer? singer.name : "---";
		// },

	}
}