(function(){


	var app = angular.module("app.todo");

	app.factory("Svc", ["$http", "$q", Svc]);


	function Svc($http, $q){
		var data = {

			todos: [
				{"name": "111", "id": 1}
			]

		};




		return {
			"data"		: data
		}
	}


})();