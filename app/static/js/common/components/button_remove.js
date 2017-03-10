/**
 * 
 */
(function(){



	var app = angular.module("app.common");


// <button class="btn btn-primary" ng-click="self.save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> Сохранить</button>


	var template = [
		'<button class="btn btn-danger" title="удалить запись">',
			'<i class="fa fa-trash" aria-hidden="true"></i> <ng-transclude>Удалить</ng-transclude>',
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
		controller 		: ComponentCtrl,
		controllerAs 	: "self"
	};


	app.component("buttonRemove", component);



	function ComponentCtrl(){
		
		var self = this;

		// self.$onInit = function(){
		// 	console.log("go back init");
		// 	// self.check();
		// }

	}


})();