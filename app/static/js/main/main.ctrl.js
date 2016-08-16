(function(){
	"use strict";


	var app = angular.module("app.main");
	app.controller("MainCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify", MainCtrl]);



	function MainCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify){

		console.log("main");
		SingersSvc.need_singers()
		.then(SongsSvc.need_songs)
		.then(function(){
			$scope.singers_data = SingersSvc.data;
			$scope.songs_data = SongsSvc.data;
		});

		// var svc = SingersSvc;
		// $scope.data = svc.data;
		// var singer_modal 	= null;
		// var remove_singer_modal 	= null;


		// $scope.data = svcData.data;
		// $scope.data.current_view = "main";
		// $scope.singer_songs = [];
		// var svc = svcData;
		// svc.data.singer = {};



		$scope.show_songs = function(singer){
			SingersSvc.data.singer_current = singer;
			$scope.singer_songs = SongsSvc.data.songs.filter(function(song){return song.singer == singer.id});
		}










	}




})();