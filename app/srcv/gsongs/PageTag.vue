<template>
	<div>
		<h3 class="page-header">{{ tag_name }} <small>список песенок</small></h3>



		<div class="row">
			<div class="col-md-8">
				<table class="table table-bordered table-condensed">
					<thead>
						<tr>
							<!-- <th>id</th> -->
							<th>Песенка</th>
							<th>Исполнитель</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(song, index) in tag_songs" :key="index">
							<!-- <td>{{ song.id }}</td> -->
							<td>
								<router-link :to="/song/ + song.id">{{ song.name }}</router-link>
							</td>
							<td>
								<router-link :to="/singer/ + song.singer">{{ get_singer_name(song.singer) }}</router-link>
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
export default {

	data: function(){
		return {
			
			"id"			: null,
		}
	},

	created: function(){
		
		this.id = this.$route.params.id; 
	},


	methods: {

		get_singer_name: function(singer_id){
			return this.$store.getters.get_singer_name(singer_id);
		}
		
		
	},


	computed: {

		// tag: function(){
		// 	return this.$store.state.tags.find(item => item.id == this.id);
		// },

		tag_name: function(){
			let tag = this.$store.state.tags.find(item => item.id == this.id);
			return tag? tag.name : "---"
		},


		tag_songs: function(){

			//--- список ссылок песен, которые учавствуют в заданной метке
			let links = this.$store.getters.get_tag_songs(this.id);

			let songs_id = links.map(item => item.id_song);

			
			let result = this.$store.state.songs.filter(song => {
				return songs_id.indexOf(song.id) > -1;
			})


			return result;
			
		}
	}
}
</script>

<style>
  
</style>
