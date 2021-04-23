// import axios from "axios";
import singersApi from "@/api/singers";

const SINGER_NAME_CACHE = {};


export default {
	state: {
		"singers"			: [],
		"singers_loaded"	: false,
	},

	mutations: {
		set_singers: function(state, singers){
			state.singers = singers;
			state.singers_loaded = true;
		},

		set_singers_loaded: (state, value) => state.singers_loaded = value,
	},

	actions: {
		/**
		 * получить список исполнителей
		 */
		fetch_singers: function(context){
			return new Promise((resolve, reject) => {
				context.commit("set_singers_loaded", false);
				singersApi.get_singers().then(data => {
					data.singers.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
					context.commit("set_singers", data.singers);
					resolve();
				});

				// axios.get("/api/get_singers").then(response => {
				// 	response.data.singers.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
				// 	context.commit("set_singers", response.data.singers);
				// 	resolve();
				// });
			})
		},
	},


	getters: {
		singers: (state) => state.singers,
		singers_loaded: (state) => state.singers_loaded,



		/**
		 * найти имя исполнителя по заданному id
		 */
		get_singer_name: (state, getters) => (singer_id) => {
			let cache_result = SINGER_NAME_CACHE[singer_id];
			if(cache_result){
				// console.log("in cache");
				return cache_result;
			}

			let singer = state.singers.find(item => item.id == singer_id);
			if(singer){
				// console.log("add cache");
				SINGER_NAME_CACHE[singer_id] = singer.name;
			}
			return singer? singer.name : "---";
		},

	}
}