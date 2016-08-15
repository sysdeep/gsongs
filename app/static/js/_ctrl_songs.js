(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("SongsCtrl", function($scope, $location, $routeParams, svcData){
		$scope.data = svcData.data;
		$scope.data.current_view = "songs";

		$scope.refresh = function(){
			svcData.get_songs();
		}


		$scope.remove = function(song){
			svcData.data.song = song;
			svcData.remove_song();
		}

		
	});




})();