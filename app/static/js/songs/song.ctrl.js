(function(){
	"use strict";


	var app = angular.module("app.songs");
	app.controller("SongCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify", SongCtrl]);



	function SongCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify){
		var svc 			= SongsSvc;
		$scope.data 		= svc.data;
		// var singer_modal 	= null;
		// var remove_modal 	= null;
		var song_id = $routeParams.song_id;



		svc.need_songs()
		.then(SingersSvc.need_singers)
		.then(function(){


			var search_result = svc.data.songs.filter(function(song){return song.id == song_id});


			if(search_result.length > 0){
				svc.data.song_current = search_result[0];
			}else{
				svc.data.song_current = {};
			}
		});



		// $scope.refresh = function(){
		// 	svc.get_songs().then(function(){
		// 		notify.n_success("Список песенок загружен");
		// 	});
		// }

		
		$scope.find_singer_name = SingersSvc.find_singer_name;
		


		
	}




})();