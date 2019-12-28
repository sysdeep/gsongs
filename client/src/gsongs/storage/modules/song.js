import axios from "axios";

const SINGER_NAME_CACHE = {};


export default {
	state: {
		"song"				: null,
		"song_loaded"		: true,
		"song_id"			: null,
		"song_tag_links"	: [],
	},

	mutations: {
		// set_tags: function(state, tags){
		// 	state.tags = tags;
		// 	state.tags_loaded = true;
		// },

		
		set_song: (state, song) => state.song = song,
		set_song_loaded: (state, value) => state.song_loaded = value,
		set_song_id: (state, song_id) => state.song_id = song_id,
		set_song_tag_links: (state, song_tag_links) => state.song_tag_links = song_tag_links,
	},

	actions: {
		
		/**
		 * получить заданную песенку
		 */
		fetch_song: function(context, song_id){
			context.commit("set_song_id", song_id);
			context.commit("set_song_loaded", false);
			return new Promise((resolve, reject) => {
				axios.get("/api/get_song/" + song_id).then(response => {
					context.commit("set_song", response.data.song);
					context.commit("set_singer_songs", response.data.singer_songs || []);
					context.commit("set_song_tag_links", response.data.tag_links || []);
					context.commit("set_song_loaded", true);
					resolve(response.data.song);
				});
			})
		},

		/**
		 * получить данные заданной песенки(для редактирования)
		 */
		fetch_song_simple: function(context, song_id){
			return new Promise((resolve, reject) => {
				axios.get("/api/get_song/" + song_id).then(response => {
					resolve(response.data.song);
				});
			})
		},





		//--- song actions --------------------------------------------------------
		song_update: function(context, params){
			return new Promise((resolve, reject) =>{
				axios.post("/api/update_song", params).then(response => {
					// context.dispatch("fetch_songs");
					resolve(response.data.song);
				})
			})
		},


		song_create: function(context, params){
			return new Promise((resolve, reject) =>{
				axios.post("/api/create_song", params).then(response => {
					// context.dispatch("fetch_songs");
					// resolve(response.data.result.id);
					resolve();
				})
			})
		},

		song_remove: function(context, params){
			return new Promise((resolve, reject) =>{
				axios.post("/api/remove_song", params).then(response => {
					context.dispatch("fetch_songs");
					resolve();
				})
			})
		},
		//--- song actions --------------------------------------------------------





		/**
		 * добавить связь песенки с тэгом
		 */
		song_add_tag: function(context, params){
			axios.post("/api/add_song_tag", params).then(response => {
				context.commit("set_song_tag_links", response.data.song_tag_links || []);
				// context.dispatch("fetch_tag_song_links");
			});
		},

		/**
		 * удалить связи песенки с тэгом
		 */
		song_remove_tag: function(context, params){
			return axios.post("/api/remove_song_tag", params).then(response => {
				context.commit("set_song_tag_links", response.data.song_tag_links || []);
				// context.dispatch("fetch_tag_song_links");
			});
		},




	},


	getters: {
		song: (state) => state.song,
		song_singer: (state, getters) => {
			if(!state.song) return null;
			return getters.singers.find(singer => singer.id == state.song.singer);
		},
		song_loaded: (state) => state.song_loaded,
		song_tag_links: (state) => state.song_tag_links,

		// /**
		//  * получить список ссылок для песен, связанных с заданной меткой
		//  */
		// get_tag_songs: (state, getters) => (tag_id) => {
		// 	return state.tag_song_links.filter(item => item.id_tag == tag_id);
		// },

		// get_song_tags: (state, getters) => (song_id) => {
		// 	return state.tag_song_links.filter(item => item.id_song == song_id);
		// },



	}
}