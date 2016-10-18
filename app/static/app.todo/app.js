(function(){

	var app = angular.module("app.todo", ['ngMaterial']);



	app.run(function(){
		console.log("run");
	});



	function config_interpolate($interpolateProvider) {
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
	};

	app.config(['$interpolateProvider', config_interpolate]);


})();