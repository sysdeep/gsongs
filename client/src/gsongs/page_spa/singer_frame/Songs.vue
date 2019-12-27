<template>
	<div>


		<table class="table table-bordered table-sm">
			<thead>
				<tr>
					<th>
						<a href="javascript: void(0)" @click="act_sort('name')">Название</a>
					</th>
					<!-- <th>Автор</th>
				<th>Альбом</th>
				<th>Описание</th>
				<th>Жанр</th> -->
				</tr>
			</thead>
			<tbody>
				<tr v-for="(song, index) in singer_songs" :key="index">
					<td>
						<!-- <router-link :to="/song/ + song.id" title="перейти к странице песни">{{ song.name }}</router-link> -->
						<a href="javascript: void(0)" @click="show_song(song.id)">{{ song.name }}</a>
					</td>
					<!-- <td>[[ song.author ]]</td>
				<td>[[ song.album ]]</td>
				<td>[[ song.description ]]</td>
				<td>[[ song.genre ]]</td> -->
					
				</tr>
				
			</tbody>
		</table>
		<div class="pull-right">
			Всего: {{ singer_songs.length }}
		</div>



	</div>
</template>



<script>
import {mapGetters} from "vuex";
export default {
	
	methods: {
		act_sort(field){

		}
	},

	computed: {
		...mapGetters(["singer", "singer_loaded", "singer_songs"])
	}
}
</script>