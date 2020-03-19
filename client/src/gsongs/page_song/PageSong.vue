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

		<hr/>

		
	
		<div class="row">
			<div class="col-md-5">


				<ul class="nav nav-tabs">
					<li class="nav-item">
    					<a class="nav-link" :class="{'active': cpage == 1}" href="javascript: void(0)" @click="cpage=1">Инфо</a>
  					</li>
					<li class="nav-item">
    					<a class="nav-link" :class="{'active': cpage == 2}" href="javascript: void(0)" @click="cpage=2">Другие</a>
  					</li>
					<li class="nav-item">
    					<a class="nav-link" :class="{'active': cpage == 3}" href="javascript: void(0)" @click="cpage=3">Метки</a>
  					</li>
  					
				</ul>

				<div>
					<SongInfo v-if="cpage==1 "/>
					
					<AnotherSongs v-if="cpage==2" />
					
					<!-- tags -->
					<Tasg :songid="song.id" v-if="cpage==3"></Tasg>
				</div>

				<br />

				<div>
					<Chords :text="song.text" />
				</div>
	

			</div>
			<div class="col-md-7 scrolled">




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
import SongInfo from "./SongInfo.vue";

export default {
	data: function(){
		return {
			"id"        : null,


			

			cpage 		: 1,	

		}
	},

	components: {
		Tasg,
		SongText,
		Chords,
		AnotherSongs,
		SongInfo
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


		// remove_modal_closed: function(){
		// 	if(this.is_removed){
		// 		// go_back();
		// 		this.$router.push("/songs");
		// 	}
		// },


		


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

<style scoped>
.scrolled{
	height: calc(100vh - 200px);
	overflow-y: auto;
}
</style>