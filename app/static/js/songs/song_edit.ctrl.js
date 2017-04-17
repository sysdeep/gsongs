(function(){
	"use strict";


	angular.module("app.songs").controller("SongEditCtrl", SongEditCtrl);

	SongEditCtrl.$inject = ["$routeParams", "SingersSvc", "SongsSvc", "CommonSvc", "TagsSvc"];






	function SongEditCtrl($routeParams, SingersSvc, SongsSvc, CommonSvc, TagsSvc){
		var self 			= this;
	
		var song_id = $routeParams.song_id;

		self.current 	= null;
		self.item 		= null;
		self.singers 	= [];
		// self.tags 		= [];


		SongsSvc.need_songs()
			.then(SingersSvc.need_singers)
			// .then(TagsSvc.need_tags)
			.then(function(){

				self.singers = SingersSvc.data.singers;
				// self.tags = TagsSvc.data.tags;

				if( song_id == 0 ){
					self.current = SongsSvc.get_default();

					if(SingersSvc.data.singer_current){
						var singer_id = SingersSvc.data.singer_current.id;
					}else{
						var singer_id = 0;
					}

					self.current.singer = singer_id;
					
				}else{

					self.current = SongsSvc.find_current(song_id);
				}

				self.item = angular.copy(self.current);


		});





		self.save = function(){
			if( self.item.id == 0 ){
				SongsSvc.create(self.item).then(function(){
					CommonSvc.n_success("Создание песенки - успешно");
					CommonSvc.go_back();
				});
			}else{
				SongsSvc.update(self.item).then(function(){
					CommonSvc.n_success("Обновление песенки - успешно");
					CommonSvc.go_back();
				});
			}
		}

		
		






	}




})();