(function(){
	"use strict";


	var app = angular.module("songsApp", [
		"ngRoute", 
		"ui-notification",
		"ngDialog",
		"app.singers",
		"app.songs"
	]);






	function config_interpolate($interpolateProvider) {
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
	};

	app.config(['$interpolateProvider', config_interpolate]);








	// app.config(function(NotificationProvider) {
	// 	NotificationProvider.setOptions({
	// 		delay: 10000,
	// 		startTop: 20,
	// 		startRight: 10,
	// 		verticalSpacing: 10,
	// 		horizontalSpacing: 10,
	// 		positionX: 'left',
	// 		positionY: 'bottom'
	// 	});
	// });


	app.config(["$routeProvider", function($routeProvider){

		//--- main
		$routeProvider.when("/main", {
			templateUrl : "/static/js_view/main.html",
			controller: "MainCtrl"
		});

		//--- singers
		// $routeProvider.when("/singers/", {
		// 	templateUrl : "/static/js_view/singers.html",
		// 	controller: "SingersCtrl"
		// });

		//--- songs
		// $routeProvider.when("/songs/", {
		// 	templateUrl : "/static/js_view/songs.html",
		// 	controller: "SongsCtrl"
		// });

		//--- edit song
		// $routeProvider.when("/song_edit/:song_id", {
		// 	templateUrl : "/static/js_view/song_edit.html",
		// 	controller: "SongEditCtrl"
		// });

		//--- singer page with songs
		// $routeProvider.when("/singer/:singer_id", {
		// 	templateUrl : "/static/js_view/singer.html",
		// 	controller: "SingerCtrl"
		// });


	



		

		$routeProvider.otherwise({redirectTo: '/main'});
	}]);




	app.run(function($rootScope, svcData, Notification, notify, $location){
		$rootScope.data = svcData.data;
		svcData.get_singers();
		svcData.get_songs();

		

	});



	






	/**
	 * search singer name by id
	 */
	app.filter("get_singer_name", ["$rootScope", function($rootScope){
		return function(singer_id){
			
			console.log("-->", singer_id);
			var search_result = $rootScope.data.singers.filter(function(singer){return singer.id == singer_id});

			if(search_result.length > 0){
				return search_result[0]["name"];
			}

			return "";

			
		};
	}]);


	


})();