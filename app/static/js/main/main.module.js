(function(){
	"use strict";



	var app = angular.module("app.main", ["ngRoute"]);



	app.config(["$routeProvider", function($routeProvider){

		//--- main
		$routeProvider.when("/main", {
			templateUrl : "/static/js/main/main.html",
			controller: "MainCtrl"
		});
		
	}]);








})();