(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("SingersCtrl", function($scope, $location, $routeParams, svcData){
		$scope.data = svcData.data;
		$scope.data.current_view = "singers";
		$scope.singer_for_remove = null;
		$scope.is_show_remove = false;
		$scope.singer_songs = [];

		// $scope.singer_edit = {
		// 	id: 0,
		// 	name: ""
		// };

		$scope.singer_edit = {};

		$scope.refresh = function(){
			svcData.get_singers();
		}

		$scope.add_singer = function(){
			svcData.data.singer = {
				id: 0,
				name: ""
			};
			$scope.singer_edit = angular.copy(svcData.data.singer);
			svcData.data.singer_edit = true;
		}

		$scope.edit_singer = function(singer){
			svcData.data.singer = singer;
			$scope.singer_edit = angular.copy(svcData.data.singer);
			svcData.data.singer_edit = true;
		}


		$scope.save_singer = function(){
			if( $scope.singer_edit.id == 0 ){
				svcData.create_singer($scope.singer_edit);
			}else{
				svcData.update_singer($scope.singer_edit);
			}
		}



		$scope.show_remove_singer = function(singer){
			$scope.singer_for_remove = singer;
			$scope.is_show_remove = true;
			$scope.singer_songs = svcData.data.songs.filter(function(song){return song.singer == singer.id});

		}
		$scope.remove_singer = function(){
			svcData.remove_singer($scope.singer_for_remove);
			$scope.singer_for_remove = {};
			$scope.is_show_remove = false;
		}

		$scope.remove_singer_cancel = function(){
			$scope.singer_for_remove = {};
			$scope.is_show_remove = false;
		}


		$scope.cancel = function(){
			svcData.data.singer_edit = false;
		}

		



		$scope.singers_filtered = function(){

			var o_data = [];
			

			angular.forEach(svcData.data.singers, function(singer){
				var add_flag = true;

				//-- search
				if(svcData.data.filter.search.singer.length > 0){
					var s_s = singer.name.toLowerCase();
					var d_s = svcData.data.filter.search.singer.toLowerCase();
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
			svcData.data.singers.sort(function(o1, o2){
				if( sort_dir ){
					return o1[field] > o2[field] ? 1 : o1[field] < o2[field] ? -1 : 0;
				}else{
					return o1[field] > o2[field] ? -1 : o1[field] < o2[field] ? 1 : 0;
				}
			});			
			sort_dir = !sort_dir;
		};

	});




})();