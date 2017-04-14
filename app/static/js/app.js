(function(){
	"use strict";


	var app = angular.module("app", [
		"ngRoute", 
		"ui-notification",
		"ngDialog",
		"app.common",
		"app.singers",
		"app.songs",
		"app.main",
		"app.tags"
	]);






	function config_interpolate($interpolateProvider) {
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
	};

	app.config(['$interpolateProvider', config_interpolate]);



	app.config(["$routeProvider", function($routeProvider){
		$routeProvider.otherwise({redirectTo: '/main'});
	}]);




	// app.run(function($rootScope, svcData, Notification, notify, $location){
	// 	$rootScope.data = svcData.data;
	// 	svcData.get_singers();
	// 	svcData.get_songs();

		

	// });



	






	


})();