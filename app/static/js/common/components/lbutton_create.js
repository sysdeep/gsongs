/**
 * <go-back>Назад</go-back>
 */
(function(){



	var app = angular.module("app.common");



	var template = [
		'<a href="[[ self.href ]]" class="btn btn-success" title="перейти к созданию новой записи">',
			'<i class="fa fa-plus" aria-hidden="true"></i> <ng-transclude>Создать</ng-transclude>',
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


	app.component("lbuttonCreate", component);



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