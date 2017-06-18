<template>
    <div>
    
        
<div class="row">
	<div class="col-md-3">
		<h4 class="page-header">
			Исполнители
			<span class="pull-right badge">{{ state.singers.length }}</span>
		</h4>

		<input type="text" class="form-control" v-model="singer_filter" placeholder="быстрый поиск">
		
		<br>

		<ul class="list-unstyled">
			<!-- <li v-for="singer in state.singers | filterBy singer_filter"> -->
			<li v-for="singer in state.singers">
				<a href="javascript: void(0)" ng-click="self.show_songs(singer)" title="отобразить список песенок для этого исполнителя">
					{{ singer.name }}
					
					<i ng-if="singer.id == self.singer.id" class="fa fa-arrow-left" aria-hidden="true"></i>
				</a>
			</li>
		</ul>
	</div>




	<div class="col-md-5">
		<h4 class="page-header">
			Песни исполнителя: 
			<a href="#/singer/[[ self.singer.id ]]" title="перейти на страницу исполнителя">
				[[ self.singer.name ]]
			</a>
			<span class="pull-right badge">[[ self.singer_songs.length ]]</span>
		</h4>

		<input type="text" class="form-control" ng-model="song_filter.name" placeholder="быстрый поиск">
		
		<br>
			
		<ul class="list-unstyled">
			<li ng-repeat="song in self.singer_songs | filter:song_filter">
				<a href="#/song/[[ song.id ]]" title="перейти к странице песни">
					[[ song.name ]]
				</a>
			</li>
		</ul>

	</div>

	<div class="col-md-4">
		<h4 class="page-header">
			Последние добавленные
			<span class="pull-right badge">[[ self.last_songs.length ]]</span>
		</h4>
		<ul>
			<li ng-repeat="song in self.last_songs">
				<a href="#/singer/[[ song.singer ]]" title="перейти к странице исполнителя">[[ self.get_singer_name(song.singer) ]]</a>
				-
				<a href="#/song/[[ song.id ]]" title="перейти к странице песни">[[ song.name ]]</a>
			</li>
		</ul>
	</div>
</div>
    
    </div>
</template>


<script>
import storage from "./storage";
import Q from "q";


function delay(){
    console.log("delay");
    let deferred = Q.defer();

    setTimeout(deferred.resolve, 1000);
    return deferred.promise;
}


export default {
    data: function(){
        return {
            "state": storage.state,

            "singer_filter"     : ""
        }
    },

    created: function(){


        storage.need_singers()
            .then(storage.need_songs)
            .then(()=>{
                console.log("after all");
            })

        // delay()
        //     .then(delay)
        //     .then(delay)
        //     .then(delay)
        //     .then(()=>{
        //     console.log("after delay");
        // })

        // storage.need_songs()
        //     .then(storage.need_songs)
        //     .then(storage.need_singers())
        //     .then(()=>{
        //         console.log("fin")
        //     })
        // // storage.need_singers().then(storage.need_songs).then(()=>{

        // // })
    }


}
</script>