(function(){
	"use strict";


	// var chars_ru = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш",
	// 	"Щ", "Э", "Ю", "Я", "0..9"];
	// var chars_en = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
	// 	"Y", "Z", "0..9"];




	var app = angular.module("app.singers");


	app.factory("SingersSvc", ["$http", "$q", SingersSvc]);



	// function SingersSvc($http, $q, notify){
	function SingersSvc($http, $q){

		var data = {

			"singers" 			: [],
			"singers_loaded" 	: false,


			"singer_current"	: null,
			"singer_edit"		: null,


			// "singer_edit": false,

			// "singer": {},
			// "singer_loaded": false,


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


		


		function get_singers(){
			var def = $q.defer();
			data.singer_loaded = false;
			$http.get("/get_singers").success(function (response) {
				data.singers = response.singers;
				data.singer_loaded = true;
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


		function need_singers(){
			var defer = $q.defer();
			if(data.singer_loaded){
				defer.resolve();
				return defer.promise;
			}else{
				return get_singers();
			}

		}




		function get_default_singer(){
			return {
				"id" 	: 0,
				"name"	: ""
			}
		}









		function create_singer(){
			var def = $q.defer();
			$http.post("/create_singer", data.singer_edit).success(function(response){
				// data.singer = response;
				// data.singers.push(data.singer);
				// notify.n_success("Заданный исполнитель создан успешно");
				get_singers();
				// data.singer_edit = false;
				def.resolve();
			}).error(function(response){
				// notify.n_error(JSON.stringify(response), "Заданный исполнитель создан неуспешно");
				def.reject();
			});

			return def.promise;
		}


		function update_singer(){
			var def = $q.defer();
			$http.post("/update_singer", data.singer_edit).success(function(response){
				// data.singer_edit.name = response.name;
				// data.singer = angular.copy(response);
				// data.singers.push(data.singer);
				// notify.n_success("Заданный исполнитель обновлён успешно");
				get_singers();
				// data.singer_edit = false;
				def.resolve();
			}).error(function(response){
				// notify.n_error(JSON.stringify(response), "Заданный исполнитель обновлён неуспешно");
				def.reject();
			});

			return def.promise;
		}



		function remove_singer(singer){
			var def = $q.defer();
			$http.post("/remove_singer", data.singer_edit).success(function(response){
				// data.singer = {};
				// var index = data.singers.indexOf(response);
				// data.singers.splice(index, 1);
				// notify.n_success("Заданный исполнитель удалён успешно");
				get_singers();
				def.resolve();
			}).error(function(response){
				def.reject();
				// notify.n_error(JSON.stringify(response), "Заданный исполнитель удалён неуспешно");
			});
			return def.promise;
		}
		//--- singers ---------------------------------------------------------










		return {
			"data"				: data,
			
			"get_singers"		: get_singers,
			"need_singers"		: need_singers,

			"get_default_singer"	: get_default_singer,

			"create_singer"		: create_singer,
			"update_singer"		: update_singer,
			"remove_singer"		: remove_singer
		}




	}




})();
