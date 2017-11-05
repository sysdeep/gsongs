<template>
	<div>
		<div v-if="!singer">
			loading...
		</div>

		<div v-if="singer">
		
			<div class="page-header">
				<h3>Исполнитель - {{ singer.name }}</h3>
			</div>
		
			<div class="row">
				<div class="col-md-6">
		
					<dl class="dl-horizontal">
						<dt>Название</dt>
						<dd>{{ singer.name }}</dd>
		
						<dt>Создание</dt>
						<dd>{{ singer.created }}</dd>
		
						<dt>Обновление</dt>
						<dd>{{ singer.updated }}</dd>
					</dl>
		
					<button-back></button-back>
		
					<div class="pull-right">
						<button-remove @click="show_remove" :disabled="is_songs"></button-remove>
						<router-link class="btn btn-primary" :to="/singer_edit/ + singer.id"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</router-link>
					</div>
		
				</div>
				<div class="col-md-6">
		

					<c-songs :singerid="singer.id" @addsong="add_song"></c-songs>
		
		
				</div>
			</div>

		
		
			<!-- <modal-remove :showed="is_modal_remove" @on-cancel="is_modal_remove = false" @on-apply="remove_singer" @closed="remove_modal_closed">
				<p>Удалить исполнителя: {{ singer.name }} ?</p>
			</modal-remove> -->
		</div>
	</div>
</template>








<script>
import storage from "../storage";
import net from "../net";
import {go_back} from "../utils";
import component_songs from "./Songs.vue";

export default {
	data: function () {
		return {

			"singer_id"			: null,
			"state": storage.state,

			// "singer_songs": [],
			// "singer": {
			// 	"name": "---",
			// 	"created": "---",
			// 	"updated": "---"
			// },


			"is_modal_remove"   : false,
			"is_removed"        : false,
			// "is_ready"          : false
		}
	},


	components: {
		"c-songs"   : component_songs
	},


	created: function () {
		this.refresh();
	},


	watch: {
		"$route": function(to, from){
			this.refresh();
		}
	},


	

	methods: {
		
		refresh: function(){
			this.singer_id = this.$route.params.id;
		},

		show_remove: function(){
			let result = confirm("Удалить?");
			if(result){
				this.remove_singer()
			}

			// this.is_modal_remove = true;
		},


		//!!! - implement!!!!
		remove_singer: function(){
			// net.remove_singer(this.singer).then((response)=>{
			// 	let index = this.state.singers.indexOf(this.singer);
			// 	this.state.singers.splice(index, 1);
			// 	this.is_removed = true;
			// 	this.is_modal_remove = false;
			// })
			// 
			console.log("need implement");
			this.$store.dispatch("singer_remove", {"singer": this.singer}).then(() => {
				// this.is_removed = true;
				// this.is_modal_remove = false;
				go_back();
			})
		},

		// remove_modal_closed: function(){
		// 	if(this.is_removed){
		// 		go_back();
		// 	}
		// },




		add_song: function(){
			this.state.current_singer_id = this.singer.id;
			this.$router.push("/song_edit/0");
		}
	},



	computed: {
		singer: function(){
			return this.$store.state.singers.find(singer => singer.id == this.singer_id);
		},


		is_songs: function(){
			let result = this.$store.state.songs.filter(song => song.singer == this.singer.id);
			return result.length > 0;
		}
	},
}
</script>