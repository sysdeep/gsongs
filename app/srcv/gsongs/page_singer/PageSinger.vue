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

						<!-- <router-link class="btn btn-primary" :to="/singer_edit/ + singer.id"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</router-link> -->
						<button class="btn btn-primary" @click="show_edit_singer()"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</button>
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
import bus from "../bus";
import {go_back} from "../utils";
import component_songs from "./Songs.vue";

export default {
	data: function () {
		return {

			"singer_id"			: null,
			"is_modal_remove"   : false,
			"is_removed"        : false,
		}
	},


	components: {
		"c-songs"   : component_songs
	},


	created(){
		this.refresh();
	},


	watch: {
		"$route": function(to, from){
			this.refresh();
		}
	},


	

	methods: {
		
		refresh(){
			this.singer_id = this.$route.params.id;
			this.$store.dispatch("fetch_singer", this.singer_id);
		},


		show_edit_singer(){
			bus.$emit("show_edit_singer", this.singer.id);
		},

		show_remove(){
			this.$alert.remove("Удалить исполнителя: "+ this.singer.name+"?").then(() => {
				this.remove_singer();
			})
		},


		remove_singer(){
			this.$store.dispatch("singer_remove", this.singer).then(() => {
				this.$router.push("/singers");
			})
		},



		add_song(){
			bus.$emit("show_create_song_for_singer", this.singer.id)
		}
	},



	computed: {
		singer: function(){
			// return this.$store.getters.find_singer(this.singer_id);
			return this.$store.state.singer;
		},

		is_songs: function(){
			let result = this.$store.getters.singer_songs(this.singer_id);
			return result.length > 0;
		}
	},
}
</script>