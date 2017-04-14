(function(){
	"use strict";




	var app = angular.module("app.tags", ["ngRoute"]);


	app.config(["$routeProvider", function($routeProvider){


		
		$routeProvider
			.when("/tags", {												//--- tags
				templateUrl 	: "/static/js/tags/tags.html",	
				controller 		: "TagsCtrl",
				controllerAs 	: "self"
			});
			// .when("/singer/:singer_id", {									//--- singer page with songs
			// 	templateUrl 	: "/static/js/singers/singer.html",
			// 	controller 		: "SingerCtrl",
			// 	controllerAs 	: "self"
			// })
			// .when("/singer_edit/:singer_id", {									//--- singer page with songs
			// 	templateUrl  	: "/static/js/singers/singer_edit.html",
			// 	controller 		: "SingerEditCtrl",
			// 	controllerAs 	: "self"
			// });
		
	}]);
})();