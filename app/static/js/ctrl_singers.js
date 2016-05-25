(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("SingersCtrl", function($scope, $location, $routeParams, svcData){
		$scope.data = svcData.data;
		$scope.data.current_view = "singers";

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



		$scope.remove_singer = function(singer){
			svcData.remove_singer(singer);
		}


		$scope.cancel = function(){
			svcData.data.singer_edit = false;
		}

		// var self = this;
		// self.singer_id = $routeParams.singer_id;

		// console.log($routeParams.singer_id);

		// // svcData.get_singer(self.singer_id);
		// svcData.get_songs_singer();



		// if(svcData.data.songs_need_update)
		// 	svcData.get_songs();



		// $scope.refresh = function(){
		// 	svcData.get_songs();
		// }


		// $scope.show_song = function(song){
		// 	console.log(song);
		// 	// svcData.data.current_song = song;
		// 	$location.path( "/song/"+song._id );
		// }

		// $scope.edit_song = function(song){
		// 	// svcData.data.song = song;
		// 	$location.path( "/edit/"+song._id );
		// }

		// $scope.remove_song = function(song){
		// 	svcData.data.song = song;
		// 	// $location.path( "/song/"+song._id );
		// 	svcData.remove_song();
		// 	// $location.path( "/main/" );

		// }

		// $scope.add = function(){
		// 	// svcData.set_default_song();
		// 	$location.path( "/edit/0" );
		// }



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



		// function filter_row(song){

		// }

		// $scope.refresh_limit = function(){
		// 	svcData.get_logs_limit();
		// }
	});




})();