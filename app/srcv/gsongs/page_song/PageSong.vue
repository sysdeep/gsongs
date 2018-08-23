<template>



	<div>

		<div v-if="!song">
			не найдено...
		</div>

	<div v-if="song">



		<h3 class="page-header">
			{{ singer_name }} - {{ song.name }}
		</h3>

		
	
		<div class="row">
			<div class="col-md-5">
	
				<table class="table table-bordered table-condensed">
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
	
				<button-back></button-back>
	
				<div class="pull-right">
					<button class="btn btn-success" @click="show_create" title="добавить запись">
						<i class="fa fa-plus" aria-hidden="true"></i> Добавить
					</button>

					<button-remove @click="show_remove"></button-remove>
					<button class="btn btn-primary" @click="show_edit" title="изменить запись"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</button>
					<!-- <router-link class="btn btn-primary" :to="/song_edit/ + song.id"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</router-link> -->
				</div>
	
				<h4 class="page-header">Другие песни исполнителя</h4>
	
				<ul>
					<li v-for="(song, index) in singer_songs" :key="index">
						<lsong :cdata="song"></lsong>
					</li>
				</ul>
	
				<!-- tags -->
				<c-tags :songid="song.id"></c-tags>
	
			</div>
			<div class="col-md-7">
	
<pre>
{{ song.text }}
</pre>
	
			</div>
		</div>
	
	  


		<modal-remove :showed="is_modal_remove" @on-cancel="is_modal_remove = false" @on-apply="remove_song" @closed="remove_modal_closed">
			<p>Удалить песенку: {{ song.name }} ?</p>
		</modal-remove>
	</div>

	</div>
</template>



<script>
import storage from "../storage";
import net from "../net";
import bus from "../bus";
import {go_back} from "../utils";
import component_tags from "./Tags.vue";


export default {
	data: function(){
		return {
			"state"     : storage.state,
			"id"        : null,


			"is_modal_remove"   : false,

		}
	},

	components: {
		"c-tags"	: component_tags
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
		// song: function(){
		// 	let song = this.$store.state.songs.find(song => song.id == this.id);
		// 	if(song){
		// 		this.$store.dispatch("set_singer_id", song.singer);
		// 	}
		// 	return song;
		// },
		// 
		song(){
			return this.$store.state.song;
		},


		singer_name: function(){
			return this.$store.getters.get_singer_name(this.song.singer);
		},



		singer_songs: function(){
			let result = this.$store.state.songs.filter(item => (item.singer == this.song.singer) && (item.id != this.id));

			return result;
		},


		




	}
}
</script>