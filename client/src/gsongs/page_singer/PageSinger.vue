<template>
	<div>
		<div v-if="!singer">
			<Spinner />
		</div>

		<div v-if="singer">
		
			<div class="page-header border-bottom mb-4">
				<h3>Исполнитель - {{ singer.name }}</h3>
			</div>
		
			<div class="row">
				<div class="col-md-6">
		
					<dl class="row">
						<dt class="col-sm-3">Название</dt>
						<dd class="col-sm-9">{{ singer.name }}</dd>
		
						<dt class="col-sm-3">Создание</dt>
						<dd class="col-sm-9">{{ singer.created }}</dd>
		
						<dt class="col-sm-3">Обновление</dt>
						<dd class="col-sm-9">{{ singer.updated }}</dd>
					</dl>
		
					<BtnBack />
		
					<div class="pull-right">
						<button-remove @click="show_remove" :disabled="is_songs"></button-remove>

						<!-- <router-link class="btn btn-primary" :to="/singer_edit/ + singer.id"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</router-link> -->
						<button class="btn btn-primary" @click="show_edit_singer()"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</button>
					</div>
		
				</div>
				<div class="col-md-6">
		

					<c-songs :songs="singer_songs" @addsong="add_song"></c-songs>
		
		
				</div>
			</div>

		
		
			<!-- <modal-remove :showed="is_modal_remove" @on-cancel="is_modal_remove = false" @on-apply="remove_singer" @closed="remove_modal_closed">
				<p>Удалить исполнителя: {{ singer.name }} ?</p>
			</modal-remove> -->
		</div>
	</div>
</template>







<script>
import {mapGetters} from "vuex";
import bus from "../bus";
import {go_back} from "../utils";
import component_songs from "./Songs.vue";

export default {
	data: function () {
		return {

			// "singer_id"			: null,
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
			let singer_id = this.$route.params.id;
			this.$store.dispatch("get_singer", singer_id);
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
		...mapGetters(["singer", "singer_loaded", "singer_songs"]),

		// singer: function(){
		// 	// return this.$store.getters.find_singer(this.singer_id);
		// 	return this.$store.state.singer;
		// },

		is_songs: function(){
			return this.singer_songs.length > 0;
			// let result = this.$store.getters.singer_songs(this.singer_id);
			// return result.length > 0;
		}
	},
}
</script>