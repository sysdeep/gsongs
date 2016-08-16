(function(){
	"use strict";


	var app = angular.module("app.main");
	app.controller("MainCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify", MainCtrl]);



	function MainCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify){

		$scope.singer_songs 	= [];
		$scope.singers_data 	= {};
		$scope.songs_data 		= {};
		$scope.is_selected 		= false;


		SingersSvc.need_singers()
		.then(SongsSvc.need_songs)
		.then(function(){
			$scope.singers_data = SingersSvc.data;
			$scope.songs_data = SongsSvc.data;
		});


		$scope.show_songs = function(singer){
			$scope.is_selected 		= true;
			SingersSvc.data.singer_current = singer;
			$scope.singer_songs = SongsSvc.data.songs.filter(function(song){return song.singer == singer.id});
		}










	}




})();