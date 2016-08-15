(function(){
	"use strict";


	var app = angular.module("app.singers");
	app.controller("SingersCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "ngDialog", "notify", SingersCtrl]);



	function SingersCtrl($scope, $location, $routeParams, SingersSvc, ngDialog, notify){
		var svc = SingersSvc;
		$scope.data = svc.data;
		var singer_modal 	= null;
		var remove_singer_modal 	= null;



		svc.need_singers().then(function(){

		});


		// $scope.data.current_view = "singers";
		// $scope.singer_for_remove = null;
		// $scope.is_show_remove = false;
		// $scope.singer_songs = [];

		// $scope.singer_edit = {
		// 	id: 0,
		// 	name: ""
		// };

		// $scope.singer_edit = {};

		$scope.refresh = function(){
			svc.get_singers().then(function(){
				notify.n_success("Список исполнителей загружен");
			});
		}

		// $scope.add_singer = function(){
		// 	svcData.data.singer = {
		// 		id: 0,
		// 		name: ""
		// 	};
		// 	$scope.singer_edit = angular.copy(svcData.data.singer);
		// 	svcData.data.singer_edit = true;
		// }

		// $scope.edit_singer = function(singer){
		// 	svcData.data.singer = singer;
		// 	$scope.singer_edit = angular.copy(svcData.data.singer);
		// 	svcData.data.singer_edit = true;
		// }


		



		// $scope.show_remove_singer = function(singer){
		// 	$scope.singer_for_remove = singer;
		// 	$scope.is_show_remove = true;
		// 	$scope.singer_songs = svcData.data.songs.filter(function(song){return song.singer == singer.id});

		// }
		// $scope.remove_singer = function(){
		// 	svcData.remove_singer($scope.singer_for_remove);
		// 	$scope.singer_for_remove = {};
		// 	$scope.is_show_remove = false;
		// }

		// $scope.remove_singer_cancel = function(){
		// 	$scope.singer_for_remove = {};
		// 	$scope.is_show_remove = false;
		// }


		// $scope.cancel = function(){
		// 	svcData.data.singer_edit = false;
		// }

		

		//--- edit singer -----------------------------------------------------
		$scope.show_add_singer = function(){
			svc.data.singer_current = svc.get_default_singer();
			svc.data.singer_edit = angular.copy(svc.data.singer_current);
			__show_singer_modal();
		}

		$scope.show_edit_singer = function(singer){
			svc.data.singer_current = singer;
			svc.data.singer_edit = angular.copy(svc.data.singer_current);
			__show_singer_modal();
		}

		function __show_singer_modal(){
			singer_modal = ngDialog.open({
				template: 'singer_modal_template' ,
				// className: 'ngdialog-theme-plain'
				className: 'ngdialog-theme-default',
				scope: $scope,
			});
		}



		$scope.save_singer = function(){
			if( svc.data.singer_edit.id == 0 ){
				svc.create_singer().then(function(){
					singer_modal.close();
				});
			}else{
				svc.update_singer().then(function(){
					singer_modal.close();
				});
			}
		}
		//--- edit singer -----------------------------------------------------



		//--- remove singer ---------------------------------------------------
		$scope.show_remove_singer = function(singer){
			svc.data.singer_current = singer;
			svc.data.singer_edit = angular.copy(svc.data.singer_current);
			remove_singer_modal = ngDialog.open({
				template: 'remove_singer_modal_template' ,
				// className: 'ngdialog-theme-plain'
				className: 'ngdialog-theme-default',
				scope: $scope,
			});
		}


		$scope.remove_singer = function(){
			svc.remove_singer().then(function(){
				remove_singer_modal.close();
			});
		}
		//--- remove singer ---------------------------------------------------






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