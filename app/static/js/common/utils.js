(function(){
	"use strict";

	var app = angular.module("app.common");

	/**
	 * обёртка над Notification
	 * https://github.com/alexcrack/angular-ui-notification
	 */
	app.factory("utils", ["$window", "jQuery", function($window, jQuery){
		return {

			set_active_main_menu: function(item){
				jQuery(".main_menu").removeClass("active");
				jQuery("."+item).addClass("active");
			},

			go_back: function(){
				$window.history.back();		
			}

			
		};
	}]);





	app.factory('jQuery', ['$window', function ($window) {
            return $window.jQuery;
        }
    ]);




})();