(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("SongEditCtrl", function($scope, $location, $routeParams, svcData){
        $scope.data = svcData.data;
        
        var self = this;
        self.mode = "";
        // $scope.current_singer_id = 0;

        $scope.song_id = $routeParams.song_id;

        if( $scope.song_id != 0 ){
            svcData.get_song($scope.song_id);
            self.mode = "edit";
            // $scope.data.current_view = "update";
        }else{
            self.mode = "add";
            svcData.set_default_song();
            // $scope.data.current_view = "edit";
        }




        $scope.save = function(){
            if( self.mode == "add" ){
                svcData.create_song();
            }else{
                svcData.update_song();
            }
        }
       
    });




})();