(function(){
	"use strict";



	var app = angular.module("app.common");

	app.component("modalRemove",{
		templateUrl: "/static/js/common/components/modal_remove.html",
		bindings: {
		 	onClose 	: "&",
		 	onRemove	: "&"
		},
		transclude		: true,
		controllerAs: "self",
		controller: ["$q", "$timeout", component_ctrl]
	});


	function component_ctrl($q, $timeout){
		var self = this;
		var el	= $("#modal_remove2");

		self.$onInit = function(){

			$timeout(__open, 0, false);

			was_closed().then(function(){
				self.onClose();
			})
		}



		function __open(){
			el.modal({"backdrop": false, "keyboard": true, "show": true});		
			// el.modal({"show": true});
		}


		function __close(){
			el.modal("hide");
		}


		function was_closed(){
			var def = $q.defer();

			el.on('hidden.bs.modal', function (e) {
			  def.resolve();
			})

			return def.promise;
		}




		self.remove = function(){
			self.onRemove();
			__close();
		}





	}




	



})();