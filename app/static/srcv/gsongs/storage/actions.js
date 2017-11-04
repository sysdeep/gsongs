import net from "../net";



export default {
	fetch_singers: function(context){
		net.get_singers().then(response => {
			context.commit("set_singers", response.data.singers);
		});
	},

	select_singer: (context, singer) => context.commit("set_singer", singer),

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
	}
}