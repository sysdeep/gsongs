(function(){
	"use strict";


	var app = angular.module("songsApp");


	app.controller("SongCtrl", function($scope, $location, $routeParams, svcData){
        $scope.data = svcData.data;
        $scope.data.current_view = "song";

        console.log($routeParams.song_id);
        var song_id = $routeParams.song_id;


        // svcData.get_song($routeParams.song_id);

        var search_result = svcData.data.songs.filter(function(song){return song.id == song_id});
        if(search_result.length > 0){
            console.log("found");
            console.log(search_result[0]);
            svcData.data.song = search_result[0];

            var search_singer = svcData.data.singers.filter(function(singer){return singer.id == svcData.data.song.singer});
            if(search_singer.length > 0){
                svcData.data.singer = search_singer[0];
            }
        }

        // $scope.edit = function(){
        //     $location.path( "/edit/"+svcData.data.song._id );
        // }




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