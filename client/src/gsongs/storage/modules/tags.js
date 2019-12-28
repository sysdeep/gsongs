import axios from "axios";

const SINGER_NAME_CACHE = {};


export default {
	state: {
		"tags"			: [],
		"tags_loaded"	: false,



		// "tags"				: [],
		// "tags_loaded"		: false,

		"tag_song_links"	: []
	},

	mutations: {
		set_tags: function(state, tags){
			state.tags = tags;
			state.tags_loaded = true;
		},

		set_tags_loaded: (state, value) => state.tags_loaded = value,

		set_tag_song_links: function(state, links){
			state.tag_song_links = links;
		},
	},

	actions: {
		/**
		 * получить список тэгов
		 */
		fetch_tags: function(context){
			axios.get("/api/get_tags").then(response => {
				context.commit("set_tags", response.data.tags);
			})
		},



		/**
		 * получить список связей тэгов и песенок
		 */
		fetch_tag_song_links: function(context){
			axios.get("/api/get_tags_songs").then(response => {
				context.commit("set_tag_song_links", response.data.result);
			})
		},



		/**
		 * создание тэга
		 */
		tag_create: function(context, params){
			return new Promise((resolve, reject) => {
				axios.post("/api/create_tag", params).then(response => {
					resolve(response.data.tag);
				});
			})
		},

		/**
		 * обновление тэга
		 */
		tag_update: function(context, params){
			return new Promise((resolve, reject) => {
				axios.post("/api/update_tag", params).then(response => {
					resolve(response.data.tag);
				});
			})
		},

		/**
		 * удаление тэга
		 */
		tag_remove: function(context, params){
			return new Promise((resolve, reject) => {
				axios.post("/api/remove_tag", params).then(response => {
					resolve(response.data.tag);
				});
			})
		},


		

	},


	getters: {
		tags: (state) => state.tags,
		tags_loaded: (state) => state.tags_loaded,

		/**
		 * получить список ссылок для песен, связанных с заданной меткой
		 */
		get_tag_songs: (state, getters) => (tag_id) => {
			return state.tag_song_links.filter(item => item.id_tag == tag_id);
		},

		get_song_tags: (state, getters) => (song_id) => {
			return state.tag_song_links.filter(item => item.id_song == song_id);
		},



	}
}