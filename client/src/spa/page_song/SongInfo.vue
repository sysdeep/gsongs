<template>
	<div class="card">
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

		
	</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
	
	computed: {
		...mapGetters(["song", "song_singer", "song_loaded"]),

		

		singer_name: function(){
			return this.song_singer? this.song_singer.name : "---";
		},

	}
}
</script>