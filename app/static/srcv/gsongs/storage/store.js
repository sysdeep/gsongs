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

		"songs"		: [],


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


		set_songs: function(state, songs){
			state.songs = songs;
		},

		set_tags: function(state, tags){
			state.tags = tags;
			state.tags_loaded = true;
		},


		set_tag_song_links: function(state, links){
			state.tag_song_links = links;
		}
	}
})