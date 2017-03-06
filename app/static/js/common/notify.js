(function(){
	"use strict";

	var app = angular.module("app.common");

	app.config(function(NotificationProvider) {
		NotificationProvider.setOptions({
			delay: 5000,
			startTop: 20,
			startRight: 10,
			verticalSpacing: 10,
			horizontalSpacing: 10,
			positionX: 'left',
			positionY: 'bottom'
		});
	});





	/**
	 * обёртка над Notification
	 * https://github.com/alexcrack/angular-ui-notification
	 */
	app.factory("notify", function(Notification){
		return {
			n_info: function(text, title){
				Notification.info({message: text || "---", title: title || ""});
			},

			n_primary: function(text, title){
				Notification.primary({message: text || "---", title: title || ""});
			},

			n_success: function(text, title){
				Notification.success({message: text || "---", title: title || ""});
			},

			n_warning: function(text, title){
				Notification.warning({message: text || "---", title: title || ""});
			},

			n_error: function(text, title){
				Notification.error({message: text || "---", title: title || ""});
			}
		};
	});




})();