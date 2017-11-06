<template>



	<div>

		<div v-if="!song">
			не найдено...
		</div>

	<div v-if="song">



		<h3 class="page-header">
			<span>{{ singer_name }}</span> -
						<span>{{ song.name }}</span>
		</h3>

		<!-- <nav class="navbar navbar-default">
			<div class="container-fluid">
	
				<div class="navbar-header">
					<span class="navbar-brand">
						<span>{{ singer.name }}</span> -
						<span>{{ song.name }}</span>
					</span>
	
				</div>
	
	
				<ul class="nav navbar-nav navbar-right">
					<li>
						<router-link to="/song_edit/0" title="перейти к созданию">
							<i class="fa fa-plus" aria-hidden="true"></i> Добавить
						</router-link>
					</li>
				</ul>
	
			</div>
		</nav> -->
	
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
								<!-- <lsinger :cdata="singer"></lsinger> -->
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
					<!--<button-remove ng-click="self.show_remove()"></button-remove>
					<lbutton-edit href="#/song_edit/[[ self.item.id ]]"></lbutton-edit>-->

					<button class="btn btn-success" @click="add_song" title="добавить запись">
						<i class="fa fa-plus" aria-hidden="true"></i> Добавить
					</button>

					<button-remove @click="show_remove"></button-remove>
					<router-link class="btn btn-primary" :to="/song_edit/ + song.id"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</router-link>
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
			// let song = this.$store.state.songs.find(song => song.id == this.id);
			// console.log(song);

		},

		
		show_remove: function(){
			let result = confirm("Удалить?");
			if(result){
				this.remove_song()
			}
			// this.is_modal_remove = true;
		},

		remove_song: function(){
			this.$store.dispatch("song_remove", {"song": this.song}).then(() => {
				this.$router.push("/songs");
				// this.is_removed = true;
				// this.is_modal_remove = false;
			});
			// net.remove_song(this.song).then((response)=>{
			// 	let index = this.state.songs.indexOf(this.song);
			// 	this.state.songs.splice(index, 1);
			// 	this.is_removed = true;
			// 	this.is_modal_remove = false;
			// })
		},

		remove_modal_closed: function(){
			if(this.is_removed){
				// go_back();
				this.$router.push("/songs");
			}
		},




		add_song: function(){
			// this.state.current_singer_id = this.singer.id;
			this.$router.push("/song_edit/0");
		},


		


	},



	computed: {
		song: function(){
			let song = this.$store.state.songs.find(song => song.id == this.id);
			return song;
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