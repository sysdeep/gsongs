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

		"songs"		: []
	},

	actions,
	getters,

	mutations: {
		set_singers: function(state, singers){
			state.singers = singers;
		},

		set_singer: (state, singer) => state.singer = singer,


		set_songs: function(state, songs){
			state.songs = songs;
		}
	}
})