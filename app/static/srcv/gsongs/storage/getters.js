


const SINGER_NAME_CACHE = {};




export default {
	/**
	 * получить песни, связанные с тек. исполнителем
	 */
	get_current_singer_songs: (state) => {
		if(!state.singer) return [];
		return state.songs.filter(song => song.singer == state.singer.id);
	},



	/**
	 * получить список ссылок для песен, связанных с заданной меткой
	 */
	get_tag_songs: (state, getters) => (tag_id) => {
		return state.tag_song_links.filter(item => item.id_tag == tag_id);
	},

	get_song_tags: (state, getters) => (song_id) => {
		return state.tag_song_links.filter(item => item.id_song == song_id);
	},


	/**
	 * найти имя исполнителя по заданному id
	 * TODO: - сделать кэш!
	 */
	get_singer_name: (state, getters) => (singer_id) => {
		let cache_result = SINGER_NAME_CACHE[singer_id];
		if(cache_result){
			// console.log("in cache");
			return cache_result;
		}

		let singer = state.singers.find(item => item.id == singer_id);
		if(singer){
			// console.log("add cache");
			SINGER_NAME_CACHE[singer_id] = singer.name;
		}
		return singer? singer.name : "---";
	},


	find_singer: (state, getters) => (singer_id) => {
		return state.singers.find(singer => singer.id == singer_id);
	}
}