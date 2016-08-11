(function(){
	"use strict";



	var app = angular.module("app.singers", ["ngRoute"]);



	app.config(["$routeProvider", function($routeProvider){


		//--- singers
		$routeProvider.when("/singers", {
			templateUrl : "/static/js/singers/singers.html",
			controller: "SingersCtrl"
		});

		//--- singer page with songs
		$routeProvider.when("/singer2/:singer_id", {
			templateUrl : "/static/js_view/singer.html",
			controller: "SingerCtrl"
		});
		
	}]);








})();