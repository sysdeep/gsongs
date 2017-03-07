(function(){




	angular.module("app.common").service("CommonSvc", CommonSvc);

	CommonSvc.$inject = ["$q", "$window"];



	function CommonSvc($q, $window){

		var data = {

			

			
		};



		function go_back(){
			$window.history.back();
		}




		return {
			"data"				: data,
			"go_back"			: go_back
			
		}




};





})();