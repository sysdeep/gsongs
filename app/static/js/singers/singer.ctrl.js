(function(){
	"use strict";


	var app = angular.module("app.singers");
	app.controller("SingerCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "CommonSvc", "notify", 
		// "singers_modal_edit", 
		SingerCtrl]);



	function SingerCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, CommonSvc, notify){
		var self 			= this;
		self.item 			= null;
		self.songs 			= [];
		var singer_id 		= $routeParams.singer_id;

		self.is_modal_remove	= false;




		SingersSvc.need_singers()
			.then(SongsSvc.need_songs)
			.then(function(){

				self.item = SingersSvc.find_current(singer_id);

				//--- singer songs
				self.songs = SongsSvc.data.songs.filter(function(song){	return song.singer == singer_id});

			});




		self.show_remove = function(){
			if(self.songs.length > 0){
				notify.n_warning("нельзя удалить исполнителя - у него есть связанные песни");
				return false;
			}
			self.is_modal_remove = true;
		}

		self.remove = function(){
			SingersSvc.remove(self.item).then(function(){
				CommonSvc.go_back();
			});
		}




		self.filtered = function(){
			var o_data = [];
			var add_flag = true;

			angular.forEach(self.songs, function(song){
				add_flag = true;

				if(self.filter_name){

					var name_search = self.filter_name.toLowerCase();			// в нижнем регистре
					var name_item = song.name.toLowerCase();					// в нижнем регистре

					//-- если нет совпадения - не добавляем
					if( name_item.indexOf(name_search) == -1 )	add_flag = false;
				}



				if(add_flag){
					o_data.push(song);
				}
			})



			return o_data;
		}








	}




})();