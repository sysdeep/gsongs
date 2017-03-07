(function(){
	"use strict";


	var app = angular.module("app.singers").controller("SingerEditCtrl", SingerEditCtrl);

	SingerEditCtrl.$inject = ["$scope", "$location", "$routeParams", "SingersSvc", "notify", "CommonSvc"]





	function SingerEditCtrl($scope, $location, $routeParams, SingersSvc, notify, CommonSvc){
		var self 			= this;
		self.item 			= null;
		self.current 		= null;

		var singer_id = $routeParams.singer_id;

		
		var svc 			= SingersSvc;
		$scope.data 		= svc.data;
		var modal_edit 		= null;
		// var remove_singer_modal 	= null;



		SingersSvc.need_singers()
			.then(function(){


				if(singer_id == 0){
					self.current = SingersSvc.get_default_singer();
				}else{
					// //--- search singer
					// var search_result = SingersSvc.data.singers.filter(function(singer){return singer.id == singer_id});
					// if(search_result.length > 0){
					// 	self.current = search_result[0];
					// }
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





		// $scope.show_edit = function(){
		// 	svc.data.singer_edit = angular.copy(svc.data.singer_current);
		// 	modal_edit = ngDialog.open(svc.make_modal_edit($scope));
			
		// 	// singers_modal_edit.open(svc.data.singer_edit );
		// }

		// $scope.modal_edit_save = function(){
		// 	var validation_result = svc.validate(svc.data.singer_edit);
		// 	if(validation_result){
		// 		notify.n_warning(validation_result);
		// 		return false;
		// 	}


		// 	svc.update_singer().then(function(){
		// 		modal_edit.close();
		// 		notify.n_success("Исполнитель обновлён");
		// 	});
		// }


		

	}




})();