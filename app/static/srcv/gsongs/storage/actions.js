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
	}
}