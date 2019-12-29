<template>
<div class="card">

	<div class="card-body">
		<h4 class="page-header">Другие песни исполнителя</h4>
		
		<ul>
			<li v-for="(song, index) in singer_songs" :key="index">
				<span v-if="is_current(song)">{{ song.name }}</span>
				<span v-else>
					<lsong :cdata="song"></lsong>
				</span>
			</li>
		</ul>
	</div>

</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
	

	methods: {
		is_current(song){
			return this.song.id == song.id;
		}
	},

	computed: {
		...mapGetters(["singer_songs", "song"]),
		
		// singer_songs_without(){
		// 	return this.singer_songs.filter(r => r.id != this.song.id);
		// }
	}
}
</script>