(function(){
	"use strict";


	// var chars_ru = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш",
	// 	"Щ", "Э", "Ю", "Я", "0..9"];
	// var chars_en = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
	// 	"Y", "Z", "0..9"];




	var app = angular.module("app.singers");


	app.factory("SingersSvc", ["$http", "$q", SingersSvc]);



	function SingersSvc($http, $q){

		var data = {

			"singers" 			: [],
			"singers_loaded" 	: false,


			"singer_current"	: null,
			"singer_edit"		: null,


			"filter": {
				"search": {
					"singer": ""				// только по исполниелю
				},
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
				data.singer_edit.id = response.singer.id;
				data.singer_edit.created = response.singer.created;
				data.singer_edit.updated = response.singer.updated;
				angular.copy(data.singer_edit, data.singer_current);
				data.singers.push(data.singer_current);
				def.resolve();
			}).error(function(response){
				console.log(response);
				def.reject();
			});

			return def.promise;
		}



		function update_singer(){
			var def = $q.defer();
			$http.post("/update_singer", data.singer_edit).success(function(response){
				data.singer_edit.updated = response.singer.updated;
				angular.copy(data.singer_edit, data.singer_current);
				def.resolve();
			}).error(function(response){
				console.log(response);
				def.reject();
			});

			return def.promise;
		}



		function remove_singer(singer){
			var def = $q.defer();
			$http.post("/remove_singer", data.singer_edit).success(function(response){
				var index = data.singers.indexOf(data.singer_current);
				data.singers.splice(index, 1);
				def.resolve();
			}).error(function(response){
				console.log(response);
				def.reject();
			});
			return def.promise;
		}




		function find_singer_name(singer_id){
			var result = data.singers.filter(function(item){return item.id == singer_id});
			if(result.length > 0){
				return result[0]["name"];
			}else{
				return "---";
			}
		}


		function set_current(singer_id){
			var result = data.singers.filter(function(item){return item.id == singer_id});
			if(result.length > 0){
				data.singer_current = result[0];
			}else{
				data.singer_current = {};
			}	
		}


		function validate(singer){
			var name = singer.name;

			//--- name null
			if(name.length == 0)	return "поле name - пустое";

			//--- name limit 100
			if(name.length > 100)	return "поле name - слишком длинное";

			//--- name uniq
			var search_result = data.singers.filter(function(row){return row.name.toUpperCase() == name.toUpperCase()});
			if(search_result.length > 0){
				var found_singer = search_result[0];
				if(found_singer.id != singer.id) return "поле name - не уникально";
			}


			return "";
		}


		return {
			"data"				: data,
			
			"get_singers"		: get_singers,
			"need_singers"		: need_singers,

			"get_default_singer"	: get_default_singer,

			"create_singer"		: create_singer,
			"update_singer"		: update_singer,
			"remove_singer"		: remove_singer,

			"find_singer_name"	: find_singer_name,
			"set_current"		: set_current,

			"validate"			: validate
		}




	}




})();
