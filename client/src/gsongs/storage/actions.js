import axios from "axios";


export default {


	// preload_data: function(context){
	// 	return new Promise((resolve, reject) => {
	// 		axios.get("/api/preload_data").then(response => {
	// 			response.data.singers.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
	// 			context.commit("set_singers", response.data.singers);
	// 			resolve();
	// 		});
	// 	})
	// },



	// /**
	//  * получить список исполнителей
	//  */
	// fetch_singers: function(context){
	// 	return new Promise((resolve, reject) => {
	// 		axios.get("/api/get_singers").then(response => {
	// 			response.data.singers.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
	// 			context.commit("set_singers", response.data.singers);
	// 			resolve();
	// 		});
	// 	})
	// },


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
	// fetch_songs: function(context){
	// 	axios.get("/api/get_songs").then(response => {
	// 		context.commit("set_songs", response.data.songs);
	// 	});
	// },

	



	//--- tags ----------------------------------------------------------------

	


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





	






}