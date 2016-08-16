(function(){
	"use strict";


	var app = angular.module("songsApp", [
		"ngRoute", 
		"ui-notification",
		"ngDialog",
		"app.singers",
		"app.songs",
		"app.main"
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



	






	/**
	 * search singer name by id
	 */
	// app.filter("get_singer_name", ["$rootScope", function($rootScope){
	// 	return function(singer_id){
			
	// 		console.log("-->", singer_id);
	// 		var search_result = $rootScope.data.singers.filter(function(singer){return singer.id == singer_id});

	// 		if(search_result.length > 0){
	// 			return search_result[0]["name"];
	// 		}

	// 		return "";

			
	// 	};
	// }]);


	


})();