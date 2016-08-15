(function(){
	"use strict";


	var app = angular.module("app.songs");
	app.controller("SongsCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify", SongsCtrl]);



	function SongsCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify){
		var svc 			= SongsSvc;
		$scope.data 		= svc.data;
		// var singer_modal 	= null;
		var remove_modal 	= null;



		svc.need_songs()
		.then(SingersSvc.need_singers)
		.then(function(){

		});



		$scope.refresh = function(){
			svc.get_songs().then(function(){
				notify.n_success("Список песенок загружен");
			});
		}

		
		$scope.find_singer_name = SingersSvc.find_singer_name;
		


		//--- remove  ---------------------------------------------------------
		$scope.show_remove = function(song){
			svc.data.song_current = song;
			svc.data.song_edit = angular.copy(svc.data.song_current);
			remove_modal = ngDialog.open({
				template: 'remove_modal_template' ,
				className: 'ngdialog-theme-default',
				scope: $scope,
			});
		}


		$scope.remove_song = function(){
			svc.remove_song().then(function(){
				remove_modal.close();
				notify.n_success("Песенка удалена");
			});
		}
		//--- remove  ---------------------------------------------------------






		$scope.singers_filtered = function(){

			var o_data = [];
			

			angular.forEach(svc.data.singers, function(singer){
				var add_flag = true;

				//-- search
				if(svc.data.filter.search.singer.length > 0){
					var s_s = singer.name.toLowerCase();
					var d_s = svc.data.filter.search.singer.toLowerCase();
					if(s_s.indexOf(d_s) == -1)
						add_flag = false;
				}


				if(add_flag) o_data.push(singer);
			});
			return o_data;

		}






		/**
		 * сортировка
		 * @type {Boolean}
		 */
		var sort_dir = true;
		$scope.sort = function(field){
			svc.data.singers.sort(function(o1, o2){
				if( sort_dir ){
					return o1[field] > o2[field] ? 1 : o1[field] < o2[field] ? -1 : 0;
				}else{
					return o1[field] > o2[field] ? -1 : o1[field] < o2[field] ? 1 : 0;
				}
			});			
			sort_dir = !sort_dir;
		};

	}




})();