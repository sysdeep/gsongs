/**
 * <go-back>Назад</go-back>
 */
(function(){



	var app = angular.module("app.common");



	var template = [
		'<button class="btn btn-default" ng-click="self.go_back()" title="вернуться назад">',
			'<i class="fa fa-chevron-left" aria-hidden="true"></i> <ng-transclude>Назад</ng-transclude>',
		'</button>'
	].join("");


	//--- описание компонента
	var component = {
		// restrict: 'E',
		// bindings: {
		// 	// sip: "<"
		// 	// cClick 	: "&"
		// },
		transclude		: true,
		template 		: template,
		controller 		: ["$window", ComponentCtrl],
		controllerAs 	: "self"
	};


	app.component("buttonBack", component);



	function ComponentCtrl($window){
		
		var self = this;

		// self.$onInit = function(){
		// 	console.log("go back init");
		// 	// self.check();
		// }

		self.go_back = function(){
			$window.history.back();
		}
	}


})();