(function(){

	var app = angular.module("app.todo", []);



	app.run(function(){
		console.log("run");
	});



	function config_interpolate($interpolateProvider) {
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
	};

	app.config(['$interpolateProvider', config_interpolate]);


	app.factory('jQuery', [
        '$window',
        function ($window) {
            return $window.jQuery;
        }
    ]);


})();