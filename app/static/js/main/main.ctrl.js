(function(){
	"use strict";


	var app = angular.module("app.main");
	app.controller("MainCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify", MainCtrl]);



	function MainCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify){
		var last_count 			= 10;
		$scope.singer_songs 	= [];
		$scope.singers_data 	= {};
		$scope.songs_data 		= {};
		$scope.is_selected 		= false;
		$scope.last_songs 		= [];


		SingersSvc.need_singers()
		.then(SongsSvc.need_songs)
		.then(function(){
			$scope.singers_data = SingersSvc.data;
			$scope.songs_data = SongsSvc.data;

			$scope.last_songs = __found_last(angular.copy(SongsSvc.data.songs));

		});


		$scope.show_songs = function(singer){
			$scope.is_selected 		= true;
			SingersSvc.data.singer_current = singer;
			$scope.singer_songs = SongsSvc.data.songs.filter(function(song){return song.singer == singer.id});
		}



		$scope.get_singer_name = function(singer_id){
			return SingersSvc.find_singer_name(singer_id);
		}



		function __found_last(songs_array){
			songs_array.sort(function(a, b){return b.id - a.id});
			return songs_array.slice(0, last_count);
		}






	}




})();