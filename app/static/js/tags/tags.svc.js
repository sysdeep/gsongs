(function(){
	"use strict";




	var app = angular.module("app.tags");


	app.factory("TagsSvc", ["$http", "$q", TagsSvc]);



	function TagsSvc($http, $q){




		var data = {

			"tags" 			: [],
			"tags_loaded" 	: false,


			// "singer_current"	: null,
			// "singer_edit"		: null,


			// "filter": {
			// 	"search": {
			// 		"singer": ""				// только по исполниелю
			// 	},
			// }
			
		};


		


		function get_tags(){
			var def = $q.defer();
			data.tags_loaded = false;
			$http.get("/get_tags").then(function (response) {
				data.tags = response.data.tags;
				data.tags_loaded = true;
				def.resolve();
			});

			return def.promise;
		}


		function need_tags(){
			var defer = $q.defer();
			if(data.tags_loaded){
				defer.resolve();
				return defer.promise;
			}else{
				return get_tags();
			}

		}




		function get_default(){
			return {
				"id" 	: 0,
				"name"	: ""
			}
		}




		function create(sdata){
			return $http.post("/create_tag", sdata);
			// var def = $q.defer();
			// $http.post("/create_tag", sdata).success(function(response){
			// 	sdata.id = response.singer.id;
			// 	sdata.created = response.singer.created;
			// 	sdata.updated = response.singer.updated;
			// 	data.singer_current = angular.copy(sdata);
			// 	data.singers.push(data.singer_current);
			// 	def.resolve();
			// }).error(function(response){
			// 	console.log(response);
			// 	def.reject();
			// });

			// return def.promise;
		}



		function update(sdata){
			return $http.post("/update_tag", sdata);
			// var def = $q.defer();
			// $http.post("/update_singer", sdata).success(function(response){
			// 	sdata.updated = response.singer.updated;
			// 	angular.copy(sdata, data.singer_current);
			// 	def.resolve();
			// }).error(function(response){
			// 	console.log(response);
			// 	def.reject();
			// });

			// return def.promise;
		}



		function remove(tag){
			return $http.post("/remove_tag", tag);
		// 	var def = $q.defer();
		// 	$http.post("/remove_singer", singer).success(function(response){
		// 		var index = data.singers.indexOf(singer);
		// 		data.singers.splice(index, 1);
		// 		def.resolve();
		// 		data.singer_current = null;
		// 	}).error(function(response){
		// 		console.log(response);
		// 		def.reject();
		// 	});
		// 	return def.promise;
		}


		function add_song_tag(song_id, tag_id){
			var send_data = {
				"song_id" 	: song_id,
				"tag_id" 	: tag_id
			}
			return $http.post("/add_song_tag", send_data);
		}


		function remove_song_tag(song_id, tag_id){
			var send_data = {
				"song_id" 	: song_id,
				"tag_id" 	: tag_id
			}
			return $http.post("/remove_song_tag", send_data);
		}


		function get_song_tags(song_id){
			return $http.get("/get_song_tags/" + song_id);
		}


		function get_tag_songs(tag_id){
			return $http.get("/get_tag_songs/" + tag_id);
		}


		// function find_current(id){
		// 	var results = data.singers.filter(function(item){return item.id == id});
		// 	if(results.length > 0){
		// 		data.singer_current = results[0];
		// 	}else{
		// 		data.singer_current = null;
		// 	}
		// 	return data.singer_current;
		// }



		// function find_singer_name(singer_id){
		// 	var result = data.singers.filter(function(item){return item.id == singer_id});
		// 	if(result.length > 0){
		// 		return result[0]["name"];
		// 	}else{
		// 		return "---";
		// 	}
		// }




		// /**
		//  * !!! DEPRICATED - use find_current
		//  * 
		//  */
		// function find_singer(singer_id){
		// 	var result = data.singers.filter(function(item){return item.id == singer_id});
		// 	return (result.length > 0)? result[0] : {};
		// }


		// // function set_current(singer_id){
		// // 	var result = data.singers.filter(function(item){return item.id == singer_id});
		// // 	if(result.length > 0){
		// // 		data.singer_current = result[0];
		// // 	}else{
		// // 		data.singer_current = {};
		// // 	}	
		// // }


		// function validate(singer){
		// 	var name = singer.name;

		// 	//--- name null
		// 	if(name.length == 0)	return "поле name - пустое";

		// 	//--- name limit 100
		// 	if(name.length > 100)	return "поле name - слишком длинное";

		// 	//--- name uniq
		// 	var search_result = data.singers.filter(function(row){return row.name.toUpperCase() == name.toUpperCase()});
		// 	if(search_result.length > 0){
		// 		var found_singer = search_result[0];
		// 		if(found_singer.id != singer.id) return "поле name - не уникально";
		// 	}


		// 	return "";
		// }


		return {
			"data"				: data,
			
			"get_tags"		: get_tags,
			"need_tags"		: need_tags,

			// "find_current"		: find_current,

			"get_default"	: get_default,

			// // "create_singer"		: create_singer,
			// // "update_singer"		: update_singer,

			"create"			: create,
			"update"			: update,
			"remove"			: remove,


			"add_song_tag"		: add_song_tag,
			"remove_song_tag"	: remove_song_tag,
			"get_song_tags"		: get_song_tags,

			"get_tag_songs"		: get_tag_songs

			// "find_singer_name"	: find_singer_name,
			// "find_singer"		: find_singer,
			// // "set_current"		: set_current,

			// "validate"			: validate,



			// "make_modal_edit"		: make_modal_edit
		}




	}




})();
