/**
 * <go-back>Назад</go-back>
 */
(function(){



	var app = angular.module("app.common");


// <button class="btn btn-primary" ng-click="self.save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> Сохранить</button>


	var template = [
		'<button class="btn btn-primary" title="сохранить запись">',
			'<i class="fa fa-floppy-o" aria-hidden="true"></i> <ng-transclude>Сохранить</ng-transclude>',
		'</button>'
	].join("");


	//--- описание компонента
	var component = {
		// restrict: 'E',
		// bindings: {
		// 	ngClick: "&"
		// 	// cClick 	: "&"
		// },
		transclude		: true,
		template 		: template,
		controller 		: ["$window", ComponentCtrl],
		controllerAs 	: "self"
	};


	app.component("buttonSave", component);



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