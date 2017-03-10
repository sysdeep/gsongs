(function(){
	"use strict";



	var app = angular.module("app.songs", ["ngRoute"]);



	app.config(["$routeProvider", function($routeProvider){


		//--- songs
		$routeProvider
			.when("/songs", {
				templateUrl 	: "/static/js/songs/songs.html",
				controller 		: "SongsCtrl",
				controllerAs 	: "self"
			})
			.when("/song/:song_id", {
				templateUrl 	: "/static/js/songs/song.html",
				controller 		: "SongCtrl",
				controllerAs 	: "self"
			})
			.when("/song_edit/:song_id", {
				templateUrl 	: "/static/js/songs/song_edit.html",
				controller 		: "SongEditCtrl",
				controllerAs 	: "self"
			});

		
	}]);








})();