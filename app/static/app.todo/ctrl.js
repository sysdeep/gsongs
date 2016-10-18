(function(){


	var app = angular.module("app.todo");

	app.controller("Ctrl", ["$mdDialog", "Svc", Ctrl]);


	function Ctrl($mdDialog, Svc){
		var self = this;
		self.data = Svc.data;




		self.show_edit = function(ev) {
		    $mdDialog.show({
		      // controller: DialogController,
		      templateUrl: '/static/app.todo/edit_modal.html',
		      // template: "<h1>Modal</h1>",
		      parent: angular.element(document.body),
		      // targetEvent: ev,
		      clickOutsideToClose:true,
		      // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
		      // $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      // $scope.status = 'You cancelled the dialog.';
		    });
		  };



	}


})();