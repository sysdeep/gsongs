(function(){
	"use strict";



	var app = angular.module("app.singers", ["ngRoute"]);



	app.config(["$routeProvider", function($routeProvider){


		
		$routeProvider
			.when("/singers", {												//--- singers
				templateUrl 	: "/static/js/singers/singers.html",	
				controller 		: "SingersCtrl",
				controllerAs 	: "self"
			})
			.when("/singer/:singer_id", {									//--- singer page with songs
				templateUrl 	: "/static/js/singers/singer.html",
				controller 		: "SingerCtrl",
				controllerAs 	: "self"
			})
			.when("/singer_edit/:singer_id", {									//--- singer page with songs
				templateUrl  	: "/static/js/singers/singer_edit.html",
				controller 		: "SingerEditCtrl",
				controllerAs 	: "self"
			});
		
	}]);








})();