//import * as Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";

import module_singers from "./modules/singers";
import module_singer from "./modules/singer";
import module_songs from "./modules/songs";
import module_song from "./modules/song";
import module_tags from "./modules/tags";
import module_tag from "./modules/tag";

// Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		module_singers,
		module_singer,
		module_songs,
		tags: module_tags,
		module_tag,
		module_song,
	},

	state: {
		// "singers"			: [],
		// "singer"			: null,
		// "singers_loaded"	: false,
		singer_id: null,
	},

	actions,
	getters,

	mutations: {},
});
