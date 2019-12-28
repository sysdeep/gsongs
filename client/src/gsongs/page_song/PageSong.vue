<template>
<div>

	<div v-if="!song">
		не найдено...
	</div>

	<Spinner v-if="!song_loaded"/>

	<div v-if="song">



		<h3 class="page-header">
			{{ singer_name }} - {{ song.name }}
		</h3>

		
	
		<div class="row">
			<div class="col-md-5">
	
				<table class="table table-bordered table-sm">
					<tbody>
						<tr>
							<td>Исполнитель</td>
							<td>
								<router-link :to='/singer/ + song.singer' title='перейти на страницу исполнителя'>
        							{{ singer_name }}
    							</router-link>
								
							</td>
						</tr>
	
						<tr>
							<td>Автор</td>
							<td>{{ song.author }}</td>
						</tr>
	
						<tr>
							<td>Название</td>
							<td>{{ song.name }}</td>
						</tr>
	
						<tr>
							<td>Альбом</td>
							<td>{{ song.album }}</td>
						</tr>
	
						<tr>
							<td>Описание</td>
							<td>{{ song.description }}</td>
						</tr>
	
						<tr>
							<td>Жанр</td>
							<td>{{ song.genre }}</td>
						</tr>
	
						<tr>
							<td>Создание</td>
							<td>{{ song.created }}</td>
						</tr>
	
						<tr>
							<td>Обновление</td>
							<td>{{ song.updated }}</td>
						</tr>
	
					</tbody>
				</table>
	
				<BtnBack />
	
				<div class="pull-right">
					<button class="btn btn-success" @click="show_create" title="добавить запись">
						<i class="fa fa-plus" aria-hidden="true"></i> Добавить
					</button>

					<button-remove @click="show_remove"></button-remove>
					<button class="btn btn-primary" @click="show_edit" title="изменить запись"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</button>
					<!-- <router-link class="btn btn-primary" :to="/song_edit/ + song.id"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</router-link> -->
				</div>
	


				<AnotherSongs />

				<br />

				<!-- tags -->
				<Tasg :songid="song.id"></Tasg>
	

			

			</div>
			<div class="col-md-7">


<Chords :text="song.text" />

<SongText :text="song.text" />

<!-- <pre>
{{ song.text }}
</pre> -->


<!-- 
<div>
	<div v-for="(row, i) in mtext" :key="i" v-html="row" style="white-space: pre" class="mono"></div>
</div> -->

			</div>
		</div>
	
	  


		<modal-remove :showed="is_modal_remove" @on-cancel="is_modal_remove = false" @on-apply="remove_song" @closed="remove_modal_closed">
			<p>Удалить песенку: {{ song.name }} ?</p>
		</modal-remove>
	</div>

	
	</div>
</template>




<script>
import {mapGetters} from "vuex";
import bus from "../bus";
import {go_back} from "../utils";
import Tasg from "./Tags.vue";

import SongText from "./SongText.vue";
import Chords from "./Chords.vue";
import AnotherSongs from "./AnotherSongs.vue";

export default {
	data: function(){
		return {
			"id"        : null,


			"is_modal_remove"   : false,

		}
	},

	components: {
		Tasg,
		SongText,
		Chords,
		AnotherSongs
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
		refresh: function(){
			this.id = this.$route.params.id;
			this.$store.dispatch("fetch_song", this.id);
		},

		show_edit(){
			bus.$emit("show_edit_song", this.song.id);
		},

		show_create(){
			bus.$emit("show_create_song_for_singer", this.song.singer);
		},

		
		show_remove: function(){
			this.$alert.remove("Удалить песенку: "+ this.song.name+"?").then(() => {
				this.remove_song();
			})
		},

		remove_song: function(){
			this.$store.dispatch("song_remove", this.song).then(() => {
				this.$router.push("/songs");
			});
		},

		remove_modal_closed: function(){
			if(this.is_removed){
				// go_back();
				this.$router.push("/songs");
			}
		},


		


	},



	computed: {
		...mapGetters(["song", "songs", "singer_songs", "song_singer", "song_loaded"]),

		/**
		 *
		 *
		 * 
		 * var s = "qqq [E] ddd [A] ddd"
		 * s.match(/\[(.*?)\]/g)
		 * ["[E]", "[A]"]
		 *
		 *
		 * 
		 * @return {[type]} [description]
		 */
		mtext(){
			let result = this.song.text;
			let lines = result.split("\n");
			let qqq = [];
			lines.forEach(line => {
				let r = line.replace(/\[/g, "<b>").replace(/\]/g, "</b>");
				qqq.push(r);
			});
			// console.log(qqq);
			// let qqq = result.replace(/\[/g, "<b>");
			// qqq = qqq.replace(/\]/g, "</b>");
			// console.log(qqq);
			return qqq;
			// return result;
		},
		

		singer_name: function(){
			return this.song_singer? this.song_singer.name : "---";
		},

		


	}
}




</script>