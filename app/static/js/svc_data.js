(function(){
	"use strict";




	var app = angular.module("songsApp");


	app.factory("svcData", function($rootScope, $http, $location, notify){

		var data = {

			"current_view": "",

			"songs": [],
			"songs_loaded": false,

			"song": {},
			"song_edit" : {},
			"song_loaded": false,
			

			"singers": [],
			"singers_cache": {},
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


		function get_default_song(){
			var song = {
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

			return song;
		}

		function set_default_song(){
			data.song = set_default_song();
		}

		// set_default_song();

		






		//--- songs -----------------------------------------------------------
		function get_songs(){
			data.songs_loaded = false;
			$http.get("/get_songs").success(function (response) {
				data.songs = response.songs;
				data.songs_loaded = true;
				// notify.n_success("Список загружен");
			}).error(function(response){
				console.log("error");
				console.log(response);
				data.songs_loaded = false;
				// notify.n_error(JSON.stringify(response), "Ошибка загрузки списка");
			});
		}


		function create_song(){
			$http.post("/create_song", data.song_edit).success(function(response){
				angular.copy(data.song_edit, data.song);
				data.songs.push(data.song);
				notify.n_success("Запись создана успешно");
			}).error(function(response){
				console.log("error");
				console.log(response);
				notify.n_error(JSON.stringify(response), "Ошибка создания записи");
			});
		}

		function update_song(){
			$http.post("/update_song", data.song_edit).success(function(response){
				angular.copy(data.song_edit, data.song);
				notify.n_success("Запись обновлена успешно");
			}).error(function(response){
				console.log("error");
				console.log(response);
				notify.n_error(JSON.stringify(response), "Ошибка обновления записи");
			});
		}



		function remove_song(){
			$http.post("remove_song", data.song).success(function(response){
				var index = data.songs.indexOf(data.song);
				data.songs.splice(index, 1);
				data.song = {};
				// notify.n_success("Запись удалена успешно");
			}).error(function(response){
				console.log("error");
				console.log(response);
				notify.n_error(JSON.stringify(response), "Ошибка удаления записи");
			});
		}
		//--- songs -----------------------------------------------------------









		//--- singers ---------------------------------------------------------
		function get_singers(){
			$http.get("/get_singers").success(function (response) {
				data.singers = response.singers;
				data.singers_cache = {};
				data.singers.forEach(function(singer){data.singers_cache[singer.id] = singer.name});
				// notify.n_success("Список исполнителей загружен");
			}).error(function(response){
				console.log("error");
				console.log(response);
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
		//--- singers ---------------------------------------------------------










		return {
			"data"				: data,
			"get_songs"			: get_songs,
			"get_default_song"	: get_default_song,
			"create_song"		: create_song,
			"update_song"		: update_song,
			"remove_song"		: remove_song,

			"get_singers"		: get_singers,
			"create_singer"		: create_singer,
			"update_singer"		: update_singer,
			"remove_singer"		: remove_singer
		}




	});
})();
