(function(){
	"use strict";


	var app = angular.module("app.main").controller("MainCtrl", MainCtrl);


	MainCtrl.$inject = ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify"]


	function MainCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify){
		var self = this;
		var last_count 			= 10;
		
		
		self.singers	= [];
		self.songs		= [];
		
		self.singer 		= null;
		self.singer_songs 	= [];

		self.last_songs 	= [];


		SingersSvc.need_singers()
			.then(SongsSvc.need_songs)
			.then(function(){
				self.singers	= SingersSvc.data.singers;
				self.songs		= SongsSvc.data.songs;
				
				self.last_songs = __found_last(self.songs);

			});


		self.show_songs = function(singer){
			self.singer = singer;
			self.singer_songs = self.songs.filter(function(song){return song.singer == self.singer.id});
		}



		self.get_singer_name = function(singer_id){
			return SingersSvc.find_singer_name(singer_id);
		}



		function __found_last(songs_array){
			songs_array.sort(function(a, b){return b.id - a.id});
			return songs_array.slice(0, last_count);
		}






	}




})();