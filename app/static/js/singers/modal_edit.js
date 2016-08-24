(function(){
	"use strict";


	var app = angular.module("app.singers");


	app.factory("singers_modal_edit", ["ngDialog", singers_modal_edit]);


	function singers_modal_edit(ngDialog){

		var dialog = null;
		var singer = {};



		function modal_edit_ctrl(){
			var self = this;
			self.singer = singer;
		}

		var modal_edit = {
			templateUrl: "/static/js/singers/modal_edit.html",
			controller: [modal_edit_ctrl],
			className: 'ngdialog-theme-default',
			controllerAs: "self"
		}




		return {

			open: function(singer){
				singer = singer;
				dialog = ngDialog.open(modal_edit);
			},


			close: function(){
				dialog.close();
				dialog = null;
			}


		}
	}





		




})();