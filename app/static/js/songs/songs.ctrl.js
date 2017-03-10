(function(){
	"use strict";


	angular.module("app.songs").controller("SongsCtrl", SongsCtrl);

	SongsCtrl.$inject = ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify"]

	


	function SongsCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify){
		var self 			= this;

		self.songs 			= [];
		self.singers 		= [];

		var cached_singers 	= {};



		SongsSvc.need_songs()
			.then(SingersSvc.need_singers)
			.then(function(){
				self.songs = SongsSvc.data.songs;
				SingersSvc.data.singers.forEach(function(singer){
					cached_singers[singer.id] = singer.name;
				})
				
			});



		self.refresh = function(){
			SongsSvc.get_songs().then(function(){
				self.songs = SongsSvc.data.songs;
				notify.n_success("Список песенок загружен");
			});
		}


		self.find_singer_name = function(singer_id){
			return cached_singers[singer_id];
		}
		
		






		/**
		 * сортировка
		 * @type {Boolean}
		 */
		var sort_dir = true;
		self.sort = function(field){
			self.songs.sort(function(o1, o2){
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