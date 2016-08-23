(function(){
	"use strict";


	var app = angular.module("app.songs");
	app.controller("SongEditCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify", "$window", SongEditCtrl]);



	function SongEditCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify, $window){
		var svc 			= SongsSvc;
		$scope.data 		= svc.data;
		// var singer_modal 	= null;
		// var remove_modal 	= null;
		var song_id = $routeParams.song_id;
		$scope.mode = "edit";


		svc.need_songs()
		.then(SingersSvc.need_singers)
		.then(function(){

			$scope.singers = SingersSvc.data.singers;

			if( song_id == 0 ){
				$scope.mode = "add";

				svc.data.song_current = svc.get_default_song();
				svc.data.song_edit = angular.copy(svc.data.song_current);
				

				if(SingersSvc.data.singer_current){
					var singer_id = SingersSvc.data.singer_current.id;
				}else{
					var singer_id = 0;
				}
				// if(SingersSvc.data.singer_current.id){
				// 	svc.data.song_edit.singer = SingersSvc.data.singer.id;
				// }
				svc.data.song_edit.singer = singer_id;


				
			}else{
				$scope.mode = "edit";
				var search_result = svc.data.songs.filter(function(song){return song.id == song_id});
				if(search_result.length > 0){
					svc.data.song_current = search_result[0];
					svc.data.song_edit = angular.copy(svc.data.song_current);
				}
			}




		});



		// $scope.refresh = function(){
		// 	svc.get_songs().then(function(){
		// 		notify.n_success("Список песенок загружен");
		// 	});
		// }

		
		$scope.find_singer_name = SingersSvc.find_singer_name;
		



		$scope.save = function(){
			if( $scope.mode == "add" ){
				svc.create_song().then(function(){
					notify.n_success("Создание песенки - успешно");
					$location.path("/song/"+svc.data.song_edit.id);
				});
			}else{
				svc.update_song().then(function(){
					notify.n_success("Обновление песенки - успешно");
					$location.path("/song/"+svc.data.song_edit.id);
				});
			}
		}

		
		$scope.go_back = function(){
			$window.history.back();
		}







	}




})();