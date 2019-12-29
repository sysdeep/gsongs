import axios from "axios";



export default {

	state: {
		singer			: null,
		singer_loaded	: true,

		singer_songs 	: [],
	},


	mutations: {
		set_singer: function(state, singer){
			state.singer = singer;
			state.singer_loaded = true;
		},

		set_singer_loaded: (state, value) => state.singer_loaded = value,
		set_singer_songs: (state, value) => state.singer_songs = value,
	},

	actions: {
		/**
		 * получить список исполнителей
		 */
		get_singer: function(context, singer_id){
			return new Promise((resolve, reject) => {
				context.commit("set_singer_loaded", false);
				axios.get("/api/get_singer/" + singer_id).then(response => {

					// response.data.singers.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
					context.commit("set_singer", response.data.singer || null);
					context.commit("set_singer_songs", response.data.songs || []);
					resolve();
				});
			})
		},
	},


	getters: {
		singer: (state) => state.singer,
		singer_loaded: (state) => state.singer_loaded,
		singer_songs: (state) => state.singer_songs,



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