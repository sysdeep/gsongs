/**
 * <go-back>Назад</go-back>
 */
(function(){



	var app = angular.module("app.common");



	var template = [
		'<a href="[[ self.href ]]" class="btn btn-primary" title="перейти к изменению записи">',
			'<i class="fa fa-pencil" aria-hidden="true"></i> <ng-transclude>Изменить</ng-transclude>',
		'</a>'
	].join("");


	//--- описание компонента
	var component = {
		bindings: {
			href: "@"
		},
		transclude		: true,
		template 		: template,
		controller 		: ComponentCtrl,
		controllerAs 	: "self"
	};


	app.component("lbuttonEdit", component);



	function ComponentCtrl(){
		
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