<template>
	<div v-if="is_ready">
		<h3 class="page-header">Список песенок для тега <small>{{ tag.name }}</small></h3>



		<div class="row">
			<div class="col-md-8">
				<table class="table table-bordered table-condensed">
					<thead>
						<tr>
							<th>id</th>
							<th>song</th>
							<th>singer</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(song, index) in tag_songs" :key="index">
							<td>{{ song.song_id }}</td>
							<td>
								<router-link :to="/song/ + song.song_id">{{ song.song_name }}</router-link>
							</td>
							<td>
								<router-link :to="/singer/ + song.singer_id">{{ song.singer_name }}</router-link>
							</td>
						</tr>
					</tbody>
				</table>
				<!-- <button class="btn btn-primary" ng-click="self.show_create()">Create</button> -->
			</div>
			<div class="col-md-4">
				<button-back></button-back>
				

			</div>
		</div>




	</div>
</template>

<script>
import storage from "./storage";
import net from "./net";
export default {

	data: function(){
		return {
			"state"			: storage.state,
			"is_ready" 		: false,
			"tag"			: null,
			"id"			: null,
			"songs_id"		: []
		}
	},

	created: function(){
		this.refresh();
	},


	methods: {
		
		refresh: function(){
			this.id = this.$route.params.id; 
			storage.need_tags()
				.then(storage.need_songs)
				.then(storage.need_singers)
				.then(()=>{
					
					this.tag = this.state.tags.find(item => item.id == this.id)


					net.get_tag_songs(this.id).then(response => {
						this.songs_id = response.data.result;
					})

					this.is_ready = true;
				});
		},


		
	},


	computed: {
		tag_songs: function(){
			var songs = [];
			this.songs_id.forEach(sid => {
				
				let song = this.state.songs.find(song => song.id == sid);
				if(song){
					var result = {};
					result.song_id = song.id;
					result.song_name = song.name;
					let singer = this.state.singers.find(singer => singer.id == song.singer);
					if(singer){
						result.singer_id = singer.id;
						result.singer_name = singer.name;
					}

					songs.push(result);
				}
			})


			return songs;
		}
	}
}
</script>

<style>
  
</style>
