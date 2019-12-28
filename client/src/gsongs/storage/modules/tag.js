import axios from "axios";



export default {
	state: {
		tag_songs 			: [],
		tag_songs_loaded	: true,
	},

	mutations: {
		// set_tags: function(state, tags){
		// 	state.tags = tags;
		// 	state.tags_loaded = true;
		// },

		
		set_tag_songs: (state, payload) => state.tag_songs = payload,
		set_tag_songs_loaded: (state, value) => state.tag_songs_loaded = value,
		// set_song_id: (state, song_id) => state.song_id = song_id,
		// set_song_tag_links: (state, song_tag_links) => state.song_tag_links = song_tag_links,
	},

	actions: {
		
		/**
		 * получить заданную песенку
		 */
		get_tag_songs: function(context, tag_id){
			// context.commit("set_song_id", song_id);
			context.commit("set_tag_songs_loaded", false);
			return new Promise((resolve, reject) => {
				axios.get("/api/get_tag_songs/" + tag_id).then(response => {
					context.commit("set_tag_songs", response.data.songs || []);
					context.commit("set_tag_songs_loaded", true);
					resolve(response.data.song);
				});
			})
		},





	},


	getters: {
		tag_songs: (state) => state.tag_songs,
		tag_songs_loaded: (state) => state.tag_songs_loaded,

	}
}