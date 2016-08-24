(function(){
	"use strict";

	var app = angular.module("songsApp");


	app.component("lsong", {
		template: "<a href='#/song/[[ $ctrl.cdata.id ]]' title='перейти на страницу песни'>[[ $ctrl.cdata.name ]]</a>",
		bindings: {
			"cdata": "="
		}
	});



	app.component("lsinger", {
		template: "<a href='#/singer/[[ $ctrl.cdata.id ]]' title='перейти на страницу исполнителя'>[[ $ctrl.cdata.name ]]</a>",
		bindings: {
			"cdata": "="
		}
	});



})();