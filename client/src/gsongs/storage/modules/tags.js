import tagsApi from "@/api/tags";


export default {
	state: {
		"tags": [],
		"tags_loaded": false,



		// "tags"				: [],
		// "tags_loaded"		: false,

		"tag_song_links": []
	},

	mutations: {
		set_tags: function (state, tags) {
			state.tags = tags;
			state.tags_loaded = true;
		},

		set_tags_loaded: (state, value) => state.tags_loaded = value,

		set_tag_song_links: function (state, links) {
			state.tag_song_links = links;
		},
	},

	actions: {
		/**
		 * получить список тэгов
		 */
		fetch_tags: function (context) {
			return new Promise((resolve, reject) => {
				tagsApi.fetch_tags().then(data => {
					context.commit("set_tags", data.data.tags);
					resolve(data)
				}).catch(err => {
					console.log(err);
					reject(err);
				})
			})
		},



		/**
		 * получить список связей тэгов и песенок
		 */
		fetch_tag_song_links: function (context) {
			return new Promise((resolve, reject) => {

				tagsApi.fetch_tag_song_links().then(data => {
					context.commit("set_tag_song_links", data.result);
					resolve(data)
				}).catch(err => {
					console.log(err)
					reject(err);
				})
			})
		},



		/**
		 * создание тэга
		 */
		tag_create: function (context, params) {
			return new Promise((resolve, reject) => {
				tagsApi.create_tag(params).then(data => {
					resolve(data.tag);
				}).catch(err => {
					console.log(err);
					reject(err);
				});
			})
		},

		/**
		 * обновление тэга
		 */
		tag_update: function (context, params) {
			return new Promise((resolve, reject) => {
				tagsApi.update_tag(params).then(data => {
					resolve(data.tag);
				}).catch(err => {
					console.log(err);
					reject(err);
				});
			})
		},

		/**
		 * удаление тэга
		 */
		tag_remove: function (context, params) {
			return new Promise((resolve, reject) => {
				tagsApi.remove_tag(params).then(data => {
					resolve(data.tag);
				}).catch(err => {
					console.log(err);
					reject(err);
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