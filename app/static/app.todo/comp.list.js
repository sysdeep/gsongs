(function(){
	"use strict";


	function get_default(){

		return {
			"id" 			: 0,
			"title"			: "",
			"description"	: "",
			"status"		: 0,
			"priority"		: 0
		}
	}


	var STATUSES = {
		0 	: "Новое",
		1 	: "В работе",
		2 	: "Завершено",
		3 	: "Отменено"
	}


	var ctrl = function(jQuery, $http){
		var self 			= this;
		self.items 			= [];
		self.item_edit 		= null;
		self.item_current 	= null;
		var modal 			= jQuery("#edit_modal");
		self.statuses 		= STATUSES;


		


		//--- actions ---------------------------------------------------------
		self.refresh = function(){
			self.items = [];
			get_items().success(function(response){
				self.items = response.items;
			})	
		}

		self.refresh();


		self.edit = function(item){
			self.item_current = item;
			self.item_edit = angular.copy(item)
			modal.modal("show");
		}

		self.save = function(){

			if(self.item_edit.id == 0){

				add_item(self.item_edit).success(function(response){
					self.item_edit.id = response.item.id;
					self.item_edit.created = response.item.created;
					self.item_edit.updated = response.item.updated;
					var new_item = angular.copy(self.item_edit);
					self.items.push(new_item);
					modal.modal("hide");
				});				

			}else{
				update_item(self.item_edit).success(function(response){
					self.item_edit.updated = response.item.updated;
					angular.copy(self.item_edit, self.item_current);
					modal.modal("hide");
				});
			}


			// angular.copy(self.item_edit, self.item_current);
			// modal.modal("hide");

			// add_item(self.item_edit).success(function(response){
			// 	console.log(response);
			// });
		}

		self.add = function(){
			self.item_edit = get_default();
			modal.modal("show");
		}


		self.remove = function(item){
			self.item_current = item;
			remove_item(self.item_current).success(function(response){
				var index = self.items.indexOf(self.item_current);

				self.items.splice(index, 1);
			})
		}
		//--- actions ---------------------------------------------------------




		//--- view data -------------------------------------------------------
		
		//--- view data -------------------------------------------------------




		function get_items(){
			return $http.get("/service/todo_get");
		}

		function add_item(item){
			return $http.post("/service/todo_add", item);
		}

		function update_item(item){
			return $http.post("/service/todo_update", item);
		}

		function remove_item(item){
			return $http.post("/service/todo_remove", item);
		}

	}




	var component = {
		templateUrl: "/static/app.todo/comp.list.html",
		// bindings: {
		// 	items: "="
		// },
		controller: ["jQuery", "$http", ctrl],
		controllerAs: "self"
	}

	var app = angular.module("app.todo");
	app.component("todoList", component);







})();