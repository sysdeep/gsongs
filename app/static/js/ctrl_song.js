(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("SongCtrl", function($scope, $location, $routeParams, svcData){
        $scope.data = svcData.data;
        $scope.data.current_view = "song";

        console.log($routeParams.song_id);


        svcData.get_song($routeParams.song_id);


        $scope.edit = function(){
            $location.path( "/edit/"+svcData.data.song._id );
        }




        // if(!svcData.data.logs_loaded)
        // 	svcData.get_logs();



        // $scope.refresh = function(){
        // 	svcData.get_logs();
        // }

        // $scope.refresh_limit = function(){
        // 	svcData.get_logs_limit();
        // }
    });




})();