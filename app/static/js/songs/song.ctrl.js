(function(){
	"use strict";


	var app = angular.module("app.songs");
	app.controller("SongCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "notify", "CommonSvc", "TagsSvc", SongCtrl]);



	function SongCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, notify, CommonSvc, TagsSvc){
		var self 			= this;
		var	item			= null;
		var song_id			= $routeParams.song_id;
		self.go_back 		= CommonSvc.go_back;
		self.singer 		= null;
		self.singer_songs	= [];
		self.tags 			= [];
		self.song_tags 		= [];
		self.free_tags		= [];

		self.is_modal_remove 	= false;


		SongsSvc.need_songs()
			.then(SingersSvc.need_singers)
			.then(TagsSvc.need_tags)
			.then(function(){

				self.tags = TagsSvc.data.tags;
				self.item = SongsSvc.find_current(song_id);

				self.singer = SingersSvc.find_current(self.item.singer);

				self.singer_songs = SongsSvc.data.songs.filter(function(song){
					return (song.singer == self.item.singer) && (song.id != self.item.id);
				})


			
				reload_song_tags();


			});


		self.show_remove = function(){
			self.is_modal_remove = true;
		}
	
		
		self.remove = function(){
			SongsSvc.remove(self.item).then(function(){
				CommonSvc.go_back();
			})
		}





		function reload_song_tags(){
			self.song_tags = [];
			self.free_tags = [];
			var tmp_tags = angular.copy(self.tags);
			TagsSvc.get_song_tags(self.item.id).then(function(response){
				var song_tags_ids = response.data.result;

				song_tags_ids.forEach(function(id){
					var tag = tmp_tags.find(function(tag){return tag.id == id});
					if(tag){
						self.song_tags.push(tag);
						var i = tmp_tags.indexOf(tag);
						tmp_tags.splice(i, 1);
					}
				})

				self.free_tags = tmp_tags;
			});
		}




		self.add_tag = function(tag){
			TagsSvc.add_song_tag(self.item.id, tag.id).then(function(response){
				reload_song_tags();
			});
		}

		self.remove_tag = function(tag){
			TagsSvc.remove_song_tag(self.item.id, tag.id).then(function(response){
				reload_song_tags();
			});
		}



		
	}




})();