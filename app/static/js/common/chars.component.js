(function(){
	"use strict";


	// var template = "<div class='chars_bar'>";
	// template += "<div class='chars_line'>";
	// template += "<a ng-repeat='ch in self.chars_ru' class='char_item' ng-class='{\"char_item_active\": self.is_active(ch)}' href='javascript: void(0)' ng-click='self.set_selection({\"char_value\": ch})'>[[ ch ]]</a>";
	// template += "</div>";
	// template += "<div class='chars_line'>";
	// template += "<a ng-repeat='ch in self.chars_en' class='char_item' href='javascript: void(0)' ng-click='self.select({\"char_value\": ch})'>[[ ch ]]</a>";
	// template += "</div>";
	// template += "</div>";



	var app = angular.module("app.common");


	function ctrl(){
		var self = this;
		self.current_char = null;
		self.chars_ru = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш",	
		"Щ", "Э", "Ю", "Я", "0..9"];
		self.chars_en = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
		"Y", "Z", "0..9"];

		self.set_selection = function(ch){
			if(self.current_char === null){
				self.current_char = ch;
			}else if(self.current_char == ch){
				self.current_char = null;
			}else{
				self.current_char = ch;
			}

			self.select({"char_value" : ch});

		}

		self.is_active = function(ch){
			return ch == self.current_char;
		}

	}



	app.component("chars", {
		// template: template,
		templateUrl: "/static/js/common/chars.component.html",
		controller: ctrl,
		controllerAs: "self",
		bindings: {
			select: "&"
		}
	});



})();