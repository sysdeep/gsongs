(function(){
	"use strict";


	var app = angular.module("app.songs");
	app.controller("SongCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "notify", "CommonSvc", SongCtrl]);



	function SongCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, notify, CommonSvc){
		var self 			= this;
		var	item			= null;
		var song_id			= $routeParams.song_id;
		self.go_back 		= CommonSvc.go_back;
		self.singer 		= null;
		self.singer_songs	= [];

		self.is_modal_remove 	= false;


		SongsSvc.need_songs()
			.then(SingersSvc.need_singers)
			.then(function(){

				self.item = SongsSvc.find_current(song_id);
				
				SingersSvc.set_current(self.item.singer);

				self.singer = SingersSvc.find_singer(self.item.singer);

				self.singer_songs = SongsSvc.data.songs.filter(function(song){
					return (song.singer == self.item.singer) && (song.id != self.item.id);
				})



			});


		self.show_remove = function(){
			self.is_modal_remove = true;
		}
	
		
		self.remove = function(){
			SongsSvc.remove(self.item).then(function(){
				CommonSvc.go_back();
			})
		}





		
	}




})();