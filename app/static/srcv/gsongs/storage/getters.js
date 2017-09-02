



export default {
	get_current_singer_songs: (state) => {
		if(!state.singer) return [];
		return state.songs.filter(song => song.singer == state.singer.id);
	}
}