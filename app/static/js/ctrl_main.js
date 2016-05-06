(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("MainCtrl", function($scope, $location, svcData){
		$scope.data = svcData.data;
		$scope.data.current_view = "main";

		if(svcData.data.songs_need_update)
			svcData.get_songs();



		$scope.refresh = function(){
			svcData.get_songs();
		}


		$scope.show_song = function(song){
			console.log(song);
			// svcData.data.current_song = song;
			$location.path( "/song/"+song._id );
		}

		$scope.edit_song = function(song){
			// svcData.data.song = song;
			$location.path( "/edit/"+song._id );
		}

		$scope.remove_song = function(song){
			svcData.data.song = song;
			// $location.path( "/song/"+song._id );
			svcData.remove_song();
			// $location.path( "/main/" );

		}

		$scope.add = function(){
			// svcData.set_default_song();
			$location.path( "/edit/0" );
		}



		$scope.songs_filtered = function(){

			var o_data = [];
			

			angular.forEach(svcData.data.songs, function(song){
				var add_flag = true;

				//-- search
				if(svcData.data.filter.search.singer.length > 0){
					var s_s = song.singer.toLowerCase();
					var d_s = svcData.data.filter.search.singer.toLowerCase();
					if(s_s.indexOf(d_s) == -1)
						add_flag = false;
				}


				if(add_flag){
					if(svcData.data.filter.search.quick.length > 0){
						var s_singer = song.singer.toLowerCase();
						var s_author = song.author.toLowerCase();
						var s_name = song.name.toLowerCase();
						var d_s = svcData.data.filter.search.quick.toLowerCase();
						if((s_singer.indexOf(d_s) == -1)&&(s_author.indexOf(d_s) == -1)&&(s_name.indexOf(d_s) == -1)){
							add_flag = false;
						}
					}
				}



				if(add_flag)
					o_data.push(song);
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