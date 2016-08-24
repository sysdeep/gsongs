(function(){
	"use strict";


	var app = angular.module("app.singers");
	app.controller("SingerCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "SongsSvc", "ngDialog", "notify", 
		// "singers_modal_edit", 
		SingerCtrl]);



	function SingerCtrl($scope, $location, $routeParams, SingersSvc, SongsSvc, ngDialog, notify){
		var svc 			= SingersSvc;
		$scope.data 		= svc.data;
		var modal_edit 		= null;
		// var remove_singer_modal 	= null;
		var singer_id = $routeParams.singer_id;



		svc.need_singers()
		.then(SongsSvc.need_songs)
		.then(function(){



			//--- search singer
			var search_result = svc.data.singers.filter(function(singer){return singer.id == singer_id});
			if(search_result.length > 0){
				svc.data.singer_current = search_result[0];
			}


			//--- singer songs
			$scope.singer_songs = SongsSvc.data.songs.filter(function(song){	return song.singer == singer_id});

		});




		$scope.filtered = function(){
			var o_data = [];
			var add_flag = true;

			angular.forEach($scope.singer_songs, function(song){
				add_flag = true;

				if($scope.filter_name){

					var name_search = $scope.filter_name.toLowerCase();			// в нижнем регистре
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








		$scope.show_edit = function(){
			svc.data.singer_edit = angular.copy(svc.data.singer_current);
			modal_edit = ngDialog.open(svc.make_modal_edit($scope));
			
			// singers_modal_edit.open(svc.data.singer_edit );
		}

		$scope.modal_edit_save = function(){
			var validation_result = svc.validate(svc.data.singer_edit);
			if(validation_result){
				notify.n_warning(validation_result);
				return false;
			}


			svc.update_singer().then(function(){
				modal_edit.close();
				notify.n_success("Исполнитель обновлён");
			});
		}


		// $scope.data.current_view = "singers";
		// $scope.singer_for_remove = null;
		// $scope.is_show_remove = false;
		// $scope.singer_songs = [];

		// $scope.singer_edit = {
		// 	id: 0,
		// 	name: ""
		// };

		// $scope.singer_edit = {};

		// $scope.refresh = function(){
		// 	svc.get_singers().then(function(){
		// 		notify.n_success("Список исполнителей загружен");
		// 	});
		// }

		// $scope.add_singer = function(){
		// 	svcData.data.singer = {
		// 		id: 0,
		// 		name: ""
		// 	};
		// 	$scope.singer_edit = angular.copy(svcData.data.singer);
		// 	svcData.data.singer_edit = true;
		// }

		// $scope.edit_singer = function(singer){
		// 	svcData.data.singer = singer;
		// 	$scope.singer_edit = angular.copy(svcData.data.singer);
		// 	svcData.data.singer_edit = true;
		// }


		



		// $scope.show_remove_singer = function(singer){
		// 	$scope.singer_for_remove = singer;
		// 	$scope.is_show_remove = true;
		// 	$scope.singer_songs = svcData.data.songs.filter(function(song){return song.singer == singer.id});

		// }
		// $scope.remove_singer = function(){
		// 	svcData.remove_singer($scope.singer_for_remove);
		// 	$scope.singer_for_remove = {};
		// 	$scope.is_show_remove = false;
		// }

		// $scope.remove_singer_cancel = function(){
		// 	$scope.singer_for_remove = {};
		// 	$scope.is_show_remove = false;
		// }


		// $scope.cancel = function(){
		// 	svcData.data.singer_edit = false;
		// }

		

		// //--- edit singer -----------------------------------------------------
		// $scope.show_add_singer = function(){
		// 	svc.data.singer_current = svc.get_default_singer();
		// 	svc.data.singer_edit = angular.copy(svc.data.singer_current);
		// 	__show_singer_modal();
		// }

		// $scope.show_edit_singer = function(singer){
		// 	svc.data.singer_current = singer;
		// 	svc.data.singer_edit = angular.copy(svc.data.singer_current);
		// 	__show_singer_modal();
		// }

		// function __show_singer_modal(){
		// 	singer_modal = ngDialog.open({
		// 		template: 'singer_modal_template' ,
		// 		// className: 'ngdialog-theme-plain'
		// 		className: 'ngdialog-theme-default',
		// 		scope: $scope,
		// 	});
		// }



		// $scope.save_singer = function(){
		// 	if( svc.data.singer_edit.id == 0 ){
		// 		svc.create_singer().then(function(){
		// 			singer_modal.close();
		// 		});
		// 	}else{
		// 		svc.update_singer().then(function(){
		// 			singer_modal.close();
		// 		});
		// 	}
		// }
		// //--- edit singer -----------------------------------------------------



		// //--- remove singer ---------------------------------------------------
		// $scope.show_remove_singer = function(singer){
		// 	svc.data.singer_current = singer;
		// 	svc.data.singer_edit = angular.copy(svc.data.singer_current);
		// 	remove_singer_modal = ngDialog.open({
		// 		template: 'remove_singer_modal_template' ,
		// 		// className: 'ngdialog-theme-plain'
		// 		className: 'ngdialog-theme-default',
		// 		scope: $scope,
		// 	});
		// }


		// $scope.remove_singer = function(){
		// 	svc.remove_singer().then(function(){
		// 		remove_singer_modal.close();
		// 	});
		// }
		// //--- remove singer ---------------------------------------------------






		// $scope.singers_filtered = function(){

		// 	var o_data = [];
			

		// 	angular.forEach(svc.data.singers, function(singer){
		// 		var add_flag = true;

		// 		//-- search
		// 		if(svc.data.filter.search.singer.length > 0){
		// 			var s_s = singer.name.toLowerCase();
		// 			var d_s = svc.data.filter.search.singer.toLowerCase();
		// 			if(s_s.indexOf(d_s) == -1)
		// 				add_flag = false;
		// 		}


		// 		if(add_flag) o_data.push(singer);
		// 	});
		// 	return o_data;

		// }






		// /**
		//  * сортировка
		//  * @type {Boolean}
		//  */
		// var sort_dir = true;
		// $scope.sort = function(field){
		// 	svc.data.singers.sort(function(o1, o2){
		// 		if( sort_dir ){
		// 			return o1[field] > o2[field] ? 1 : o1[field] < o2[field] ? -1 : 0;
		// 		}else{
		// 			return o1[field] > o2[field] ? -1 : o1[field] < o2[field] ? 1 : 0;
		// 		}
		// 	});			
		// 	sort_dir = !sort_dir;
		// };

	}




})();