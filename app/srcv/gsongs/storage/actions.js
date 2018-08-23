import axios from "axios";


export default {


	/**
	 * получить список исполнителей
	 */
	fetch_singers: function(context){
		return new Promise((resolve, reject) => {
			axios.get("/api/get_singers").then(response => {
				response.data.singers.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
				context.commit("set_singers", response.data.singers);
				resolve();
			});
		})
	},


	/**
	 * получить с сервера заданную запись исполнителя
	 */
	fetch_singer: function(context, singer_id){
		context.commit("set_singer_id", singer_id);
		return new Promise((resolve, reject) => {
			axios.get("/api/get_singer/" + singer_id).then(response => {
				context.commit("set_singer", response.data.singer);
				resolve(response.data.singer);
			});
		})
	},


	/**
	 * получить с сервера данные заданного исполнителя(для редактирования)
	 */
	fetch_singer_simple: function(context, singer_id){
		return new Promise((resolve, reject) => {
			axios.get("/api/get_singer/" + singer_id).then(response => {
				resolve(response.data.singer);
			});
		})
	},

	


	/**
	 * получить краткий список песенок
	 */
	fetch_songs: function(context){
		axios.get("/api/get_songs").then(response => {
			context.commit("set_songs", response.data.songs);
		});
	},

	/**
	 * получить заданную песенку
	 */
	fetch_song: function(context, song_id){
		context.commit("set_song_id", song_id);
		return new Promise((resolve, reject) => {
			axios.get("/api/get_song/" + song_id).then(response => {
				context.commit("set_song", response.data.song);
				resolve(response.data.song);
			});
		})
	},

	/**
	 * получить данные заданной песенки(для редактирования)
	 */
	fetch_song_simple: function(context, song_id){
		return new Promise((resolve, reject) => {
			axios.get("/api/get_song/" + song_id).then(response => {
				resolve(response.data.song);
			});
		})
	},



	//--- tags ----------------------------------------------------------------

	/**
	 * получить список тэгов
	 */
	fetch_tags: function(context){
		axios.get("/api/get_tags").then(response => {
			context.commit("set_tags", response.data.tags);
		})
	},



	/**
	 * получить список связей тэгов и песенок
	 */
	fetch_tag_song_links: function(context){
		axios.get("/api/get_tags_songs").then(response => {
			context.commit("set_tag_song_links", response.data.result);
		})
	},


	/**
	 * создание тэга
	 */
	tag_create: function(context, params){
		return new Promise((resolve, reject) => {
			axios.post("/api/create_tag", params).then(response => {
				resolve(response.data.tag);
			});
		})
	},

	/**
	 * обновление тэга
	 */
	tag_update: function(context, params){
		return new Promise((resolve, reject) => {
			axios.post("/api/update_tag", params).then(response => {
				resolve(response.data.tag);
			});
		})
	},

	/**
	 * удаление тэга
	 */
	tag_remove: function(context, params){
		return new Promise((resolve, reject) => {
			axios.post("/api/remove_tag", params).then(response => {
				resolve(response.data.tag);
			});
		})
	},


	/**
	 * добавить связь песенки с тэгом
	 */
	song_add_tag: function(context, params){
		axios.post("/api/add_song_tag", params).then(response => {
			context.dispatch("fetch_tag_song_links");
		});
	},

	/**
	 * удалить связи песенки с тэгом
	 */
	song_remove_tag: function(context, params){
		return axios.post("/api/remove_song_tag", params).then(response => {
			context.dispatch("fetch_tag_song_links");
		});
	},

	//--- tags ----------------------------------------------------------------




	//--- singer actions ------------------------------------------------------
	singer_update: function(context, esinger){
		return new Promise((resolve, reject) =>{
			axios.post("/api/update_singer", esinger).then(response => {
				resolve(response.data.singer);
			})
		})
	},


	singer_create: function(context, esinger){
		return new Promise((resolve, reject) =>{
			axios.post("/api/create_singer", esinger).then(response => {
				resolve();
			})
		})
	},

	singer_remove: function(context, esinger){
		return new Promise((resolve, reject) =>{
			axios.post("/api/remove_singer", esinger).then(response => {
				context.dispatch("fetch_singers");
				resolve();
			})
		})
	},
	//--- singer actions ------------------------------------------------------





	//--- song actions --------------------------------------------------------
	song_update: function(context, params){
		return new Promise((resolve, reject) =>{
			axios.post("/api/update_song", params).then(response => {
				// context.dispatch("fetch_songs");
				resolve(response.data.song);
			})
		})
	},


	song_create: function(context, params){
		return new Promise((resolve, reject) =>{
			axios.post("/api/create_song", params).then(response => {
				// context.dispatch("fetch_songs");
				// resolve(response.data.result.id);
				resolve();
			})
		})
	},

	song_remove: function(context, params){
		return new Promise((resolve, reject) =>{
			axios.post("/api/remove_song", params).then(response => {
				context.dispatch("fetch_songs");
				resolve();
			})
		})
	},
	//--- song actions --------------------------------------------------------






}