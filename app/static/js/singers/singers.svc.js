(function(){
	"use strict";


	var chars_ru = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш",
		"Щ", "Э", "Ю", "Я", "0..9"];
	var chars_en = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
		"Y", "Z", "0..9"];




	var app = angular.module("app.singers");


	app.factory("SingersSvc", function($http, $q, notify){

		var data = {

			

	

			"singers" 			: [],
			"singers_loaded" 	: false,

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
			
			"get_singers"		: get_singers,
			"create_singer"		: create_singer,
			"update_singer"		: update_singer,
			"remove_singer"		: remove_singer
		}




	});
})();
