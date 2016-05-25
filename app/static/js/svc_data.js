(function(){
	"use strict";




	var app = angular.module("songsApp");


	app.factory("svcData", function($rootScope, $http, $location, notify){

		var data = {

			"current_view": "",

			"songs": [],
			// "songs_count": 0,
			"songs_loaded": false,
			"songs_need_update": true,

			"song": {},
			"song_loaded": false,
			

			"singers": [],
			"singers_loaded": false,
			"singer_edit": false,

			"singer": {},
			"singer_loaded": false,


			"filter": {
				"search": {
					"quick": "",				// по всем полям
					"singer": ""				// только по исполниелю
				},
				"date_start": "0000-00-00",
				"date_end": "3000-12-31",

				"time_start": "00:00:00",
				"time_end": "23:59:59",
			}
			
		};


		function set_default_song(){
			data.song = {
				// _id			: 0,
				singer		: "",					// исполнитель
				author		: "",					// автор
			    name 		: "",					// название песни
			    album		: "",					// альбом
			    text		: "",					// текст
			    description	: "",					// доп. описание
			    // tags		: Array,				// теги
			    genre		: "", 					// жанр
			    created		: "",					// дата создания
			    updated		: "",					// дата изменения
			    api 		: 1
			};
		}



		set_default_song();

		


		function get_songs(){
			data.songs_loaded = false;
			$http.get("/get_songs").success(function (response) {
				data.songs = response.songs;
				data.songs_loaded = true;
				data.songs_need_update = false;
				notify.n_success("Список загружен");

			}).error(function(response){
				console.log("error");
				console.log(response);
				data.songs_loaded = true;
				data.songs_need_update = true;

				notify.n_error(JSON.stringify(response), "Ошибка загрузки списка");
			});
		}



		function get_song(id){
			data.song_loaded = false;

			$http.get("/songs/get_song/"+id).success(function (response) {
				data.song = response;
				data.song_loaded = true;
			}).error(function(response){
				console.log("error");
				console.log(response);
				data.song_loaded = true;
				notify.n_error(JSON.stringify(response), "Ошибка загрузки записи");
			});
		}



		function create_song(){
			// data.song.singer = data.singer.name;
			// data.song.singer_id = data.singer._id;
			console.log(data.song);
			$http.post("/create_song", data.song).success(function(response){
				console.log("ok");
				console.log(response);
				// data.song._id = response._id;
				// data.song.created = response.created;
				// data.song.updated = response.updated;
				// data.songs_need_update = true;
				notify.n_success("Запись создана успешно");
				// $location.path( "/song/"+data.song._id );
				// get_singers();
			}).error(function(response){
				console.log("error");
				console.log(response);
				notify.n_error(JSON.stringify(response), "Ошибка создания записи");
			});
		}

		function update_song(){
			// data.song.singer = data.singer.name;
			// data.song.singer_id = data.singer._id;
			$http.post("/songs/update_song", data.song).success(function(response){
				console.log("ok");
				data.song.updated = response.updated;
				data.songs_need_update = true;
				notify.n_success("Запись обновлена успешно");
				$location.path( "/song/"+data.song._id );
				get_singers();
			}).error(function(response){
				console.log("error");
				console.log(response);
				notify.n_error(JSON.stringify(response), "Ошибка обновления записи");
			});
		}



		function remove_song(){
			$http.post("/songs/remove_song", data.song).success(function(response){
				console.log("ok");
				// data.songs_need_update = true;


				var index = data.songs.indexOf(data.song);
				data.songs.splice(index, 1);
				notify.n_success("Запись удалена успешно");
			}).error(function(response){
				console.log("error");
				console.log(response);
				notify.n_error(JSON.stringify(response), "Ошибка удаления записи");
			});
		}











		function get_singers(){
			$http.get("/get_singers").success(function (response) {
				data.singers = response.singers;
				notify.n_success("Список исполнителей загружен");
			}).error(function(response){
				console.log("error");
				console.log(response);
			});
		}


		function get_singer(id){
			data.singer_loaded = false;

			$http.get("/songs/get_singer/"+id).success(function (response) {
				data.singer = response;
				data.singer_loaded = true;
				notify.n_success("Загрузка записи исполнителя - успешно");
				// _cb(null, response);
			}).error(function(response){
				console.log("error");
				console.log(response);
				data.singer_loaded = true;
				notify.n_error(JSON.stringify(response), "Ошибка загрузки записи исполнителя");
				// _cb("error", response);
			});
		}


		function get_songs_singer(singer_id){
			data.songs_loaded = false;

			$http.post("/songs/get_songs_singer/", {_id: singer_id}).success(function (response) {
				data.songs = response;
				data.songs_loaded = true;
				notify.n_success("Загрузка списка песен для исполнителя - успешно");
			}).error(function(response){
				console.log("error");
				console.log(response);
				data.songs_loaded = true;
				notify.n_error(JSON.stringify(response), "Ошибка загрузки списка песен для исполнителя");
			});
		}




		function create_singer(singer){
			$http.post("/create_singer", singer).success(function(response){
				// data.singer = response;
				// data.singers.push(data.singer);
				notify.n_success("Заданный исполнитель создан успешно");
				get_singers();
				data.singer_edit = false;
			}).error(function(response){
				notify.n_error(JSON.stringify(response), "Заданный исполнитель создан неуспешно");
			});
		}


		function update_singer(singer){
			$http.post("/update_singer", singer).success(function(response){
				data.singer.name = response.name;
				// data.singer = angular.copy(response);
				// data.singers.push(data.singer);
				notify.n_success("Заданный исполнитель обновлён успешно");
				get_singers();
				data.singer_edit = false;
			}).error(function(response){
				notify.n_error(JSON.stringify(response), "Заданный исполнитель обновлён неуспешно");
			});
		}



		function remove_singer(singer){
			$http.post("/remove_singer", singer).success(function(response){
				// data.singer = {};
				// var index = data.singers.indexOf(response);
				// data.singers.splice(index, 1);
				notify.n_success("Заданный исполнитель удалён успешно");
				get_singers();
			}).error(function(response){
				notify.n_error(JSON.stringify(response), "Заданный исполнитель удалён неуспешно");
			});
		}











		return {
			"data"				: data,
			"get_songs"			: get_songs,
			"get_song"			: get_song,
			"set_default_song"	: set_default_song,
			"create_song"		: create_song,
			"update_song"		: update_song,
			"remove_song"		: remove_song,


			"get_singers"		: get_singers,
			// "select_singer"		: select_singer
			"get_singer"		: get_singer,
			"get_songs_singer"			: get_songs_singer,
			"create_singer"		: create_singer,
			"update_singer"		: update_singer,
			"remove_singer"		: remove_singer
		}




	});
})();
