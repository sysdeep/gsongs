(function(){
	"use strict";


	var app = angular.module("app.tags");
	app.controller("TagCtrl", ["$location", "$routeParams", "SingersSvc", "SongsSvc", "notify", "CommonSvc", "TagsSvc", TagCtrl]);



	function TagCtrl($location, $routeParams, SingersSvc, SongsSvc, notify, CommonSvc, TagsSvc){
		var self 			= this;
		
		// var	item			= null;
		var tag_id			= $routeParams.tag_id;
		self.tag 	= null;
		self.songs = [];


		TagsSvc.get_tags()
			.then(SongsSvc.need_songs)
			.then(SingersSvc.need_singers)
			.then(function(){

				self.tag = TagsSvc.data.tags.find(function(tag){return tag.id == tag_id});

				TagsSvc.get_tag_songs(tag_id).then(function(response){
					var songs_ids = response.data.result	


					var songs = [];
					songs_ids.forEach(function(song_id){
						var song = SongsSvc.data.songs.find(function(song){return song.id == song_id});
						songs.push(song);
					})

					self.songs = songs;
				});

			})



		self.get_singer = function(singer_id){
			var singer = SingersSvc.data.singers.find(function(singer){return singer.id == singer_id})
			return singer;
		}


		// SongsSvc.need_songs()
		// 	.then(SingersSvc.need_singers)
		// 	.then(TagsSvc.need_tags)
		// 	.then(function(){

		// 		self.tags = TagsSvc.data.tags;
		// 		self.item = SongsSvc.find_current(song_id);

		// 		self.singer = SingersSvc.find_current(self.item.singer);

		// 		self.singer_songs = SongsSvc.data.songs.filter(function(song){
		// 			return (song.singer == self.item.singer) && (song.id != self.item.id);
		// 		})


			
		// 		reload_song_tags();


		// 	});


		// self.show_remove = function(){
		// 	self.is_modal_remove = true;
		// }
	
		
		// self.remove = function(){
		// 	SongsSvc.remove(self.item).then(function(){
		// 		CommonSvc.go_back();
		// 	})
		// }





		// function reload_song_tags(){
		// 	self.song_tags = [];
		// 	self.free_tags = [];
		// 	var tmp_tags = angular.copy(self.tags);
		// 	TagsSvc.get_song_tags(self.item.id).then(function(response){
		// 		var song_tags_ids = response.data.result;

		// 		song_tags_ids.forEach(function(id){
		// 			var tag = tmp_tags.find(function(tag){return tag.id == id});
		// 			if(tag){
		// 				self.song_tags.push(tag);
		// 				var i = tmp_tags.indexOf(tag);
		// 				tmp_tags.splice(i, 1);
		// 			}
		// 		})

		// 		self.free_tags = tmp_tags;
		// 	});
		// }




		// self.add_tag = function(tag){
		// 	TagsSvc.add_song_tag(self.item.id, tag.id).then(function(response){
		// 		reload_song_tags();
		// 	});
		// }

		// self.remove_tag = function(tag){
		// 	TagsSvc.remove_song_tag(self.item.id, tag.id).then(function(response){
		// 		reload_song_tags();
		// 	});
		// }



		
	}




})();