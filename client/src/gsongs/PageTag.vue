<template>
	<div>
		<h3 class="page-header">{{ tag_name }} <small>список песенок</small></h3>

		<Spinner v-if="!tag_songs_loaded"/>

		<div class="row">
			<div class="col-md-6">
				<table class="table table-bordered table-sm">
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
			<div class="col-md-6">

				<SongsFrame :songs="tag_songs" />

				<BtnBack />
				<button-remove @click="show_remove" :disabled="tag_songs.length > 0"></button-remove>

			</div>
		</div>


	</div>
</template>

<script>
import {mapGetters} from "vuex";
import SongsFrame from "@/components/SongsFrame/SongsFrame.vue"
export default {

	data: function(){
		return {
			
			"id"			: null,
		}
	},

	components: {
		SongsFrame
	},

	created: function(){
		this.refresh();
		
	},

	watch: {
		"$route": function(to, from){
			this.refresh();
		}
	},


	methods: {

		

		refresh(){
			this.id = this.$route.params.id; 
			this.$store.dispatch("get_tag_songs", this.id).then(r => {

			})
		},

		get_singer_name: function(singer_id){
			return this.$store.getters.get_singer_name(singer_id);
		},

		show_remove: function(){

			this.$show_confirm("Удалить тэг: "+ this.tag_name+"?").then(() => {
				let data = {
					"id"	: this.id,
					"name"	: this.tag_name
				}
				this.$store.dispatch("tag_remove", data).then(removed_tag => {
					this.$toastr.success("Запись удалена");
					this.$store.dispatch("fetch_tags");
					this.$router.push("/tags");
				})
			})

			
		},
		
		
	},


	computed: {

		...mapGetters(["tags", "tag_songs", "tag_songs_loaded"]),

	

		tag_name: function(){
			let tag = this.tags.find(item => item.id == this.id);
			return tag? tag.name : "---"
		},


	}
}
</script>

<style>
  
</style>
