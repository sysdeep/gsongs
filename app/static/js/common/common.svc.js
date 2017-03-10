(function(){




	angular.module("app.common").service("CommonSvc", CommonSvc);

	CommonSvc.$inject = ["$q", "$window", "notify"];



	function CommonSvc($q, $window, notify){

		var data = {

			

			
		};



		function go_back(){
			$window.history.back();
		}




		return {
			"data"				: data,
			"go_back"			: go_back,

			"n_info"			: notify.n_info,
			"n_primary"			: notify.n_primary,
			"n_success"			: notify.n_success,
			"n_warning"			: notify.n_warning,
			"n_error"			: notify.n_error
			
		}




};





})();