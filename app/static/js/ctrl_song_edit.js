(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("SongEditCtrl", function($scope, $location, $routeParams, svcData){
		$scope.data = svcData.data;
		
		var self = this;
		self.mode = "";
		svcData.data.song_edit = {};
		

		$scope.song_id = $routeParams.song_id;
		console.log($location);

		if( $scope.song_id != 0 ){
			self.mode = "edit";
			var search_result = svcData.data.songs.filter(function(song){return song.id == $scope.song_id});
			if(search_result.length > 0){
				svcData.data.song = search_result[0];
				svcData.data.song_edit = angular.copy(svcData.data.song);
			}
		}else{
			self.mode = "add";
			$scope.song_edit = svcData.get_default_song();
		}




		$scope.save = function(){
			if( self.mode == "add" ){
				svcData.create_song();
			}else{
				svcData.update_song();
			}
		}




		/**
		 * back functional
		 */
		

		// var history = [];

		// $rootScope.$on('$routeChangeSuccess', function() {
		//     history.push($location.$$path);
		// });

		// $rootScope.back = function () {
		//     var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
		//     $location.path(prevUrl);
		// };
	   
	});




})();