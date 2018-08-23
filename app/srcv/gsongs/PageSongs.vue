<template>
	<div>
		<h1 class="page-header">
			Все песенки
			<small>{{ songs.length }}</small>
		</h1>
	
		<div class="row">
			<div class="col-md-6">
				<input type="text" class="form-control" v-model="search_name" placeholder="быстрый поиск">
			</div>
			<div class="col-md-6">
				<div class="pull-right">
					
					<button class="btn btn-success" title="добавить запись" @click="show_create">
						<i class="fa fa-plus" aria-hidden="true"></i> Добавить
					</button>
					
					<!-- <button class="btn btn-primary" @click="refresh" title="загрузить список">
						<i class="fa fa-refresh" aria-hidden="true"></i> Обновить
					</button> -->
					
				</div>
			</div>
		</div>
	
		<br>
	
		<table class="table table-bordered table-condensed">
			<thead>
				<tr>
					<th>
						<!-- <a href="javascript: void(0)" ng-click="self.sort('id')">id</a> -->
						id
					</th>
					<th>
						<!-- <a href="javascript: void(0)" ng-click="self.sort('singer')">Исполнитель</a> -->
						Исполнитель
					</th>
					<!-- <th>Автор</th> -->
					<th>
						<!-- <a href="javascript: void(0)" ng-click="self.sort('name')">Название</a> -->

						Название
					</th>
					<!-- <th>Альбом</th> -->
					<!-- <th>Текст</th> -->
					<!-- <th>Описание</th> -->
					<!-- <th>Жанр</th> -->
					<!-- <th>Метки</th> -->
					<!-- <th>Создание</th> -->
					<!-- <th>Обновление</th> -->
					<!-- <th>api</th> -->
					<th>options</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(song, index) in songs_filtered" :key="index">
					<td>{{ song.id }}</td>
					<td>
						<router-link :to="/singer/ + song.singer">
							<!-- <a href="javascript: void(0)" title="" ng-click="select_singer(song.singer)"> -->
							<!--{{ self.find_singer_name(song.singer) }}-->
							{{ get_singer(song.singer) }}
						</router-link>
					</td>
					<!-- <td>{{ song.author }}</td> -->
					<td>
						<router-link :to="/song/ + song.id" title="">{{ song.name }}</router-link>
						<!-- <a href="javascript: void(0)" title="" ng-click="show_song(song)">{{ song.name }}</a> -->
					</td>
					<!-- <td>{{ song.album }}</td> -->
					<!-- <td>{{ song.text }}</td> -->
					<!-- <td>{{ song.description }}</td>
				<td>{{ song.genre }}</td> -->
					<!-- <td>{{ song.tags }}</td> -->
					<!-- <td>{{ song.created }}</td> -->
					<!-- <td>{{ song.updated }}</td> -->
					<!-- <td>{{ song.api }}</td> -->
					<td>
						<!-- <router-link :to="/song_edit/ + song.id">
							<i class="fa fa-pencil"></i> изменить
							</router-link> -->

						<a href="javascript: void(0)" @click="show_edit_song(song.id)" title="изменить">
							<i class="fa fa-pencil"></i> изменить
						</a>
						<!--<a href="#/song/{{ song.id }}" title="">&nbsp
							<i class="fa fa-folder-open-o"></i>&nbsp</a>
						|
						<a href="#/song_edit/{{ song.id }}" title="">&nbsp
							<i class="fa fa-pencil"></i>&nbsp</a>-->
						<!-- |
					<a href="javascript: void(0)" title="" ng-click="show_remove(song)">&nbsp<i class="fa fa-trash-o"></i>&nbsp</a> -->
	
					</td>
				</tr>
			</tbody>
		</table>


		<!-- <div class="pull-right">
			<a class="btn btn-success" href="#/song_edit/0" title="добавить запись">
				<i class="fa fa-plus" aria-hidden="true"></i> Добавить
			</a>
		</div> -->
	
		<!-- 
	<script type="text/ng-template" id="remove_modal_template">
		<h4>Подтверждение удаления песенки</h4>
	
		<div class="alert alert-danger" role="alert">
			<p>Вы собираетесь удалить песенку: <strong>{{ data.song_edit.name }}</strong></p>
		</div>
	
		<hr>
		<div class="row">
			<div class="col-md-6">
				<button class="btn btn-default btn-block" ng-click="closeThisDialog()"><i class="fa fa-ban" aria-hidden="true"></i> Отмена</button>
			</div>
			<div class="col-md-6">
				<button class="btn btn-danger btn-block" ng-click="remove_song()"><i class="fa fa-trash-o" aria-hidden="true"></i> Удалить</button>
			</div>
		</div>
	
	</script> -->
	</div>
</template>


<script>
import bus from "./bus";

export default {
	data: () => {
		return {

			"search_name"   : "",

		}
	},


	created: function(){
	
	},


	

	methods: {
		refresh: function(){
			// storage.fetch_songs();
		},

		get_singer: function(singer_id){
			return this.$store.getters.get_singer_name(singer_id);
		},

		show_edit_song(song_id){
			bus.$emit("show_edit_song", song_id);
		},

		show_create(){
			bus.$emit("show_create_song");	
		}
	},




	computed: {
		songs: function(){
			return this.$store.state.songs;
		},



		songs_filtered: function(){
			var s_name = this.search_name.toLowerCase();
			let result = this.songs.filter((item)=>{
				let index = item.name.toLowerCase().indexOf(s_name);
				return index > -1;
			});
			return result;
		}
	},



}
</script>