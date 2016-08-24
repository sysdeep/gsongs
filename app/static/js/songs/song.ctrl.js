(function(){
	"use strict";


	var app = angular.module("app.songs");
	app.controller("SongCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify", "utils", SongCtrl]);



	function SongCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify, utils){
		var svc 			= SongsSvc;
		$scope.data 		= svc.data;
		var song_id 		= $routeParams.song_id;
		$scope.singer_songs = [];
		$scope.singer 		= {};


		svc.need_songs()
		.then(SingersSvc.need_singers)
		.then(function(){


			var search_result = svc.data.songs.filter(function(song){return song.id == song_id});


			if(search_result.length > 0){
				svc.data.song_current = search_result[0];
				SingersSvc.set_current(svc.data.song_current.singer);

				$scope.singer = SingersSvc.find_singer(svc.data.song_current.singer);
			}else{
				svc.data.song_current = {};
			}


			$scope.singer_songs = SongsSvc.data.songs.filter(function(song){
				return (song.singer == svc.data.song_current.singer) && (song.id != svc.data.song_current.id);
			})



		});


		
	
		
		$scope.go_back = utils.go_back;





		
	}




})();