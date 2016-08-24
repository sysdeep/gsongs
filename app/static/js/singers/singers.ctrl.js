(function(){
	"use strict";


	var app = angular.module("app.singers");
	app.controller("SingersCtrl", ["$scope", "$location", "$routeParams", "SingersSvc", "ngDialog", "notify", SingersCtrl]);



	function SingersCtrl($scope, $location, $routeParams, SingersSvc, ngDialog, notify){
		var svc 				= SingersSvc;
		$scope.data 			= svc.data;
		var singer_modal 		= null;
		var remove_singer_modal = null;
		var char_bar_search 	= null;



		svc.need_singers().then(function(){

		});


	

		$scope.refresh = function(){
			svc.get_singers().then(function(){
				notify.n_success("Список исполнителей загружен");
			});
		}

	
		

		//--- edit singer -----------------------------------------------------
		$scope.show_add_singer = function(){
			svc.data.singer_current = svc.get_default_singer();
			svc.data.singer_edit = angular.copy(svc.data.singer_current);
			__show_singer_modal();
		}

		$scope.show_edit_singer = function(singer){
			svc.data.singer_current = singer;
			svc.data.singer_edit = angular.copy(svc.data.singer_current);
			__show_singer_modal();
		}

		function __show_singer_modal(){
			singer_modal = ngDialog.open(svc.make_modal_edit($scope));
		}



		$scope.modal_edit_save = function(){

			var validation_result = svc.validate(svc.data.singer_edit);
			if(validation_result){
				notify.n_warning(validation_result);
				return false;
			}


			if( svc.data.singer_edit.id == 0 ){
				svc.create_singer().then(function(){
					singer_modal.close();
					notify.n_success("Исполнитель создан");
				});
			}else{
				svc.update_singer().then(function(){
					singer_modal.close();
					notify.n_success("Исполнитель обновлён");
				});
			}
		}
		//--- edit singer -----------------------------------------------------



		//--- remove singer ---------------------------------------------------
		$scope.show_remove_singer = function(singer){
			svc.data.singer_current = singer;
			svc.data.singer_edit = angular.copy(svc.data.singer_current);
			remove_singer_modal = ngDialog.open({
				template: 'remove_singer_modal_template' ,
				// className: 'ngdialog-theme-plain'
				className: 'ngdialog-theme-default',
				scope: $scope,
			});
		}


		$scope.remove_singer = function(){
			svc.remove_singer().then(function(){
				remove_singer_modal.close();
				notify.n_success("Исполнитель удалён");
			});
		}
		//--- remove singer ---------------------------------------------------






		$scope.singers_filtered = function(){

			var o_data = [];
			

			angular.forEach(svc.data.singers, function(singer){
				var add_flag = true;

				//-- search
				if(svc.data.filter.search.singer.length > 0){
					var s_s = singer.name.toLowerCase();
					var d_s = svc.data.filter.search.singer.toLowerCase();
					if(s_s.indexOf(d_s) == -1)
						add_flag = false;
				}

				if(char_bar_search != null){
					var singer_name = singer.name;
					if(singer_name[0].toUpperCase() != char_bar_search)
						add_flag = false;
				}



				if(add_flag) o_data.push(singer);
			});
			return o_data;

		}






		/**
		 * сортировка
		 * @type {Boolean}
		 */
		var sort_dir = true;
		$scope.sort = function(field){
			svc.data.singers.sort(function(o1, o2){
				if( sort_dir ){
					return o1[field] > o2[field] ? 1 : o1[field] < o2[field] ? -1 : 0;
				}else{
					return o1[field] > o2[field] ? -1 : o1[field] < o2[field] ? 1 : 0;
				}
			});			
			sort_dir = !sort_dir;
		};














		$scope.select_char = function(ch){
			if(char_bar_search === null){
				char_bar_search = ch;
			}else{
				char_bar_search = null;
			}
		}





	}




})();