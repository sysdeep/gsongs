import tagsApi from "@/api/tags";

const state = {
	tags: [],					// список меток
	tags_loaded: false,			// DEPRICATED

	is_loading: false,			// факт загрузки данных
	is_submitting: false,		// факт отправки данных
	errors: [],					// список ошибок при работе с api



	tag_song_links: []
}



export const mutationTypes = {
	GetTagsStart 	: "[tags] GetTagsStart",
	GetTagsSuccess 	: "[tags] GetTagsSuccess",
	GetTagsFailure 	: "[tags] GetTagsFailure",
}

const mutations = {

	[mutationTypes.GetTagsStart]: (state) => {
		state.is_loading = true;
		state.errors = [];
		state.tags = [];
	},

	[mutationTypes.GetTagsSuccess]: (state, tags) => {
		state.tags = tags;
		state.is_loading = false;
	},

	[mutationTypes.GetTagsFailure]: (state, errors) => {
		state.errors = errors;
		state.is_loading = false;
	},

	//--- old -----------------------------------------------------------------
	set_tags: function (state, tags) {
		state.tags = tags;
		state.tags_loaded = true;
	},

	set_tags_loaded: (state, value) => state.tags_loaded = value,

	set_tag_song_links: function (state, links) {
		state.tag_song_links = links;
	},
}



export const actionTypes = {
	GetTags 		: "[tags] GetTags",
}



export default {
	state,

	mutations,

	actions: {
		/**
		 * получить список тэгов
		 */
		[actionTypes.GetTags]: function (context) {
			return new Promise((resolve, reject) => {
				context.commit(mutationTypes.GetTagsStart);
				tagsApi.fetch_tags().then(data => {
					context.commit(mutationTypes.GetTagsSuccess, data.tags);
					resolve(data)
				}).catch(err => {
					console.log(err);
					context.commit(mutationTypes.GetTagsFailure, [err]);
					reject(err);
				})
			})
		},



		//--- UNUSED
		/**
		 * получить список связей тэгов и песенок
		 */
		// fetch_tag_song_links: function (context) {
		// 	return new Promise((resolve, reject) => {

		// 		tagsApi.fetch_tag_song_links().then(data => {
		// 			context.commit("set_tag_song_links", data.result);
		// 			resolve(data)
		// 		}).catch(err => {
		// 			console.log(err)
		// 			reject(err);
		// 		})
		// 	})
		// },



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