(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("EditCtrl", function($scope, $location, $routeParams, svcData){
        $scope.data = svcData.data;
        
        var self = this;
        // $scope.current_singer_id = 0;

        $scope.song_id = $routeParams.song_id;

        if( $scope.song_id != 0 ){
            svcData.get_song($scope.song_id);
            $scope.data.current_view = "update";
        }else{
            svcData.set_default_song();
            $scope.data.current_view = "edit";
        }




        $scope.save = function(){
            if( svcData.data.song._id === undefined ){
                svcData.create_song();
            }else{
                svcData.update_song();
            }
        }
       
    });




})();