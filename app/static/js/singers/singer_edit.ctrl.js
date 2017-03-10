(function(){
	"use strict";


	var app = angular.module("app.singers").controller("SingerEditCtrl", SingerEditCtrl);

	SingerEditCtrl.$inject = ["$scope", "$location", "$routeParams", "SingersSvc", "notify", "CommonSvc"]





	function SingerEditCtrl($scope, $location, $routeParams, SingersSvc, notify, CommonSvc){
		var self 			= this;
		self.item 			= null;
		self.current 		= null;

		var singer_id = $routeParams.singer_id;

		

		SingersSvc.need_singers()
			.then(function(){

				if(singer_id == 0){
					self.current = SingersSvc.get_default();
				}else{
					self.current = SingersSvc.find_current(singer_id);
				}

				self.item = angular.copy(self.current);

			});




		


		self.save = function(){
			if(self.item.id == 0){
				SingersSvc.create(self.item).then(function(){
					CommonSvc.go_back();
				})
			}else{
				SingersSvc.update(self.item).then(function(){
					CommonSvc.go_back();
				})
			}
		}



		

	}




})();