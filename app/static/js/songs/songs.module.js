(function(){
	"use strict";



	var app = angular.module("app.songs", ["ngRoute"]);



	app.config(["$routeProvider", function($routeProvider){


		//--- songs
		$routeProvider.when("/songs", {
			templateUrl : "/static/js/songs/songs.html",
			controller: "SongsCtrl"
		})
		.when("/song/:song_id", {
			templateUrl : "/static/js/songs/song.html",
			controller: "SongCtrl"
		})
		.when("/song_edit/:song_id", {
			templateUrl : "/static/js/songs/song_edit.html",
			controller: "SongEditCtrl"
		});

		//--- singer page with songs
		// $routeProvider.when("/singer2/:singer_id", {
		// 	templateUrl : "/static/js_view/singer.html",
		// 	controller: "SingerCtrl"
		// });
		
	}]);








})();