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
		$routeProvider.when("/singer/:singer_id", {
			templateUrl : "/static/js/singers/singer.html",
			controller: "SingerCtrl"
		});
		
	}]);








})();