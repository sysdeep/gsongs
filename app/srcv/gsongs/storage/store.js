import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import {get_default_singer} from "../utils";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		"singers"			: [],
		"singer"			: null,
		"singers_loaded"	: false,
		"singer_id"			: null,

		"songs"		: [],
		"song"		: null,
		"song_id"	: null,


		"tags"				: [],
		"tags_loaded"		: false,

		"tag_song_links"	: []
	},

	actions,
	getters,

	mutations: {
		set_singers: function(state, singers){
			// console.log("set singers");
			state.singers = singers;
			state.singers_loaded = true;
		},

		set_singer: (state, singer) => state.singer = singer,
		set_song: (state, song) => state.song = song,
		set_song_id: (state, song_id) => state.song_id = song_id,


		set_songs: function(state, songs){
			state.songs = songs;
		},

		set_tags: function(state, tags){
			state.tags = tags;
			state.tags_loaded = true;
		},


		set_tag_song_links: function(state, links){
			state.tag_song_links = links;
		},



		set_singer_id: (state, singer_id) => state.singer_id = singer_id,
	}
})