(function(){
	"use strict";


	// var chars_ru = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш",
	// 	"Щ", "Э", "Ю", "Я", "0..9"];
	// var chars_en = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
	// 	"Y", "Z", "0..9"];




	var app = angular.module("app.songs");


	app.factory("SongsSvc", ["$http", "$q", SongsSvc]);



	function SongsSvc($http, $q){

		var data = {

			"songs" 			: [],
			"songs_loaded" 		: false,


			"song_current"	: null,
			"song_edit"		: null,

			"filter": {
				"search": {
					// "quick": "",				// по всем полям
					"singer": ""				// только по исполниелю
				},
				// "date_start": "0000-00-00",
				// "date_end": "3000-12-31",

				// "time_start": "00:00:00",
				// "time_end": "23:59:59",
			}
			
		};


		


		function get_songs(){
			var def = $q.defer();
			data.songs_loaded = false;
			$http.get("/get_songs").success(function (response) {
				data.songs = response.songs;
				data.songs_loaded = true;
				// data.singers_cache = {};
				// data.singers.forEach(function(singer){data.singers_cache[singer.id] = singer.name});
				// notify.n_success("Список исполнителей загружен");
				def.resolve();
			}).error(function(response){
				console.log("error");
				console.log(response);
				def.reject();
			});

			return def.promise;
		}


		function need_songs(){
			var defer = $q.defer();
			if(data.songs_loaded){
				defer.resolve();
				return defer.promise;
			}else{
				return get_songs();
			}

		}


		function remove_song(){
			var defer = $q.defer();
			$http.post("/remove_song", data.song_current).success(function(response){
				var index = data.songs.indexOf(data.song_current);
				data.songs.splice(index, 1);
				defer.resolve();
			}).error(function(response){
				console.log(response);
				defer.reject();
			});

			return defer.promise;
		}

		function create_song(){
			var defer = $q.defer();
			$http.post("/create_song", data.song_edit).success(function(response){
				data.song_edit.id = response.result.id;
				data.song_edit.updated = response.result.updated;
				data.song_edit.created = response.result.created;
				angular.copy(data.song_edit, data.song_current);
				data.songs.push(data.song_current);
				defer.resolve();
			}).error(function(response){
				console.log(response);
				defer.reject();
			});

			return defer.promise;
		}

		function update_song(){
			var defer = $q.defer();
			$http.post("/update_song", data.song_edit).success(function(response){
				data.song_edit.updated = response.result.updated;
				angular.copy(data.song_edit, data.song_current);
				defer.resolve();
			}).error(function(response){
				console.log("error");
				defer.reject();
			});

			return defer.promise;
		}



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






		return {
			"data"				: data,
			
			"get_songs"		: get_songs,
			"need_songs"		: need_songs,

			"get_default_song"	: get_default_song,

			"create_song"		: create_song,
			"update_song"		: update_song,
			"remove_song"		: remove_song
		}




	}




})();
