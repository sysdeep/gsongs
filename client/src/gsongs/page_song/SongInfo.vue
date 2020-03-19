<template>
	<div class="card111">
			<!-- <div class="card border-success"> -->
				<!-- <h5 class="card-header bg-success text-white">
					Заказ
				</h5> -->

		<table class="table table-bordered table-sm mb-0">

			
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

		<br />

		<div>
			<BtnBack />
	
			<div class="pull-right">
				<button class="btn btn-success" @click="show_create" title="добавить запись">
					<i class="fa fa-plus" aria-hidden="true"></i> Добавить
				</button>

				<button-remove @click="show_remove"></button-remove>
				<button class="btn btn-primary" @click="show_edit" title="изменить запись"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</button>
				<!-- <router-link class="btn btn-primary" :to="/song_edit/ + song.id"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</router-link> -->
			</div>

			<div class="clear-fix"></div>
		</div>


		<!-- <modal-remove :showed="is_modal_remove" @on-cancel="is_modal_remove = false" @on-apply="remove_song" @closed="remove_modal_closed">
			<p>Удалить песенку: {{ song.name }} ?</p>
		</modal-remove> -->
		
	</div>
</template>

<script>

import {mapGetters} from "vuex";
import bus from "../bus";

export default {

	data(){
		return {
			// is_modal_remove   : false,
		}
	},

	methods: {
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

		show_edit(){
			bus.$emit("show_edit_song", this.song.id);
		},



	},
	
	computed: {
		...mapGetters(["song", "song_singer", "song_loaded"]),

		

		singer_name: function(){
			return this.song_singer? this.song_singer.name : "---";
		},


	}
}
</script>