import net from "../net";



export default {
	fetch_singers: function(context){
		net.get_singers().then(response => {
			context.commit("set_singers", response.data.singers);
		});
	},

	select_singer: (context, singer) => context.commit("set_singer", singer),

	set_current_singer: (context, singer_id) => {
		let singer = context.state.singers.find(singer => singer.id == singer_id);
		console.log(singer);
		context.commit("set_singer", singer);
	},

	need_singers: function(context){
		if(context.state.singers_loaded) return false;
		context.dispatch("fetch_singers");
	},



	fetch_songs: function(context){
		net.get_songs().then(response => {
			context.commit("set_songs", response.data.songs);
		});
	},


	fetch_tags: function(context){
		net.get_tags().then(response => {
			context.commit("set_tags", response.data.tags);
		})
	},

	need_tags: function(context){
		if(context.state.tags_loaded) return false;
		context.dispatch("fetch_tags");
	},


	fetch_tag_song_links: function(context){
		net.get_tags_songs().then(response => {
			context.commit("set_tag_song_links", response.data.result);
		})
	},








	song_add_tag: function(context, params){
		net.add_song_tag(params.song_id, params.tag_id).then(response => {
			context.dispatch("fetch_tag_song_links");
		});
	},

	song_remove_tag: function(context, params){
		net.remove_song_tag(params.song_id, params.tag_id).then(response => {
			context.dispatch("fetch_tag_song_links");
		});
	},





	singer_update: function(context, params){
		return new Promise((resolve, reject) =>{
			net.update_singer(params.singer).then(response => {
				// console.log("update ok");
				// let singer
				context.dispatch("fetch_singers");

				resolve();
			})
		})
	},


	singer_create: function(context, params){
		return new Promise((resolve, reject) =>{
			net.create_singer(params.singer).then(response => {
				// console.log("create ok");
				// let singer
				context.dispatch("fetch_singers");
				resolve(response.data.singer.id);
			})
		})
	},

	singer_remove: function(context, params){
		return new Promise((resolve, reject) =>{
			net.remove_singer(params.singer).then(response => {
				// console.log("create ok");
				// let singer
				context.dispatch("fetch_singers");
				resolve();
			})
		})
	},






	song_update: function(context, params){
		return new Promise((resolve, reject) =>{
			net.update_song(params.song).then(response => {
				// console.log("update ok");
				// let song
				context.dispatch("fetch_songs");
				
				resolve();
			})
		})
	},


	song_create: function(context, params){
		return new Promise((resolve, reject) =>{
			net.create_song(params.song).then(response => {
				// console.log("create ok");
				// let song
				context.dispatch("fetch_songs");
				resolve(response.data.result.id);
			})
		})
	},

	song_remove: function(context, params){
		return new Promise((resolve, reject) =>{
			net.remove_song(params.song).then(response => {
				// console.log("create ok");
				// let song
				context.dispatch("fetch_songs");
				resolve();
			})
		})
	},






}