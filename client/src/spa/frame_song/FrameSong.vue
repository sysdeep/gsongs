<template>
<div class="column_field1111" id="song_side">

	<Spinner v-if="!song_loaded"/>

    <div v-if="song">

		<SectionHeader>
        	<!-- title -->
			<h4 class="clip">{{ singer_name }} - {{ song.name }}</h4>
			<!-- title -->

    	</SectionHeader>
		
		<!-- <hr /> -->
        
		<div class="column_scroll_q" ref="scroll_field">
        	<SongText :text="song.text" />
        	{{ song }}
		</div>

		<!-- <hr /> -->
		<SectionFooter>

			<!-- <nav class="navbar navbar-dark bg-dark">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
        				<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      				</li>
				</ul>
			</nav> -->


			<!-- <ul class="nav">
  <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li>
</ul> -->

			<button class="btn btn-success" @click="show_edit()">edit</button>
		</SectionFooter>

    </div>

    
</div>
</template>


<script>
import {mapGetters} from 'vuex';
import SongText from "./SongText.vue";
import bus from "../bus";

import SectionHeader from "../components/SectionHeader.vue";
import SectionFooter from "../components/SectionFooter.vue";

export default {
    
    created(){
		this.refresh();
	},

    components: {
		SongText,
		SectionHeader,
		SectionFooter
    },

	watch: {
		"$route": function(to, from){
			this.refresh();
		}
	},


	

	methods: {
		
		refresh(){
            let song_id = this.$route.params.song_id;
            this.$store.dispatch("fetch_song", song_id);
			// this.song_id = song_id;
			
			//--- https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript
			// 	console.log(this.$refs.scroll_field);
			// if(this.$refs.scroll_field){

			// 	this.$refs.scroll_field.scrollTop(0);
			// }
		},
		
		show_edit(){
			bus.$emit("show_edit_song", this.song.id);
		}
    },

    computed: {
        ...mapGetters(["song", "singer", "song_loaded"]),

        singer_name(){
            return this.singer? this.singer.name : "---";
        }
    }


}
</script>


<style scoped>


#song_side{
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

.column_scroll_q{
	height: calc(100vh - 50px - 50px - 50px);
    overflow-x: hidden;
    overflow-y: auto;
}


.clip{
	white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    text-overflow: ellipsis; /* Добавляем многоточие */
}


/* #song_frame{
	margin-top: 20px;
     /* position: -webkit-sticky;
    position: sticky; */
    /* top: 50px;  */
	/*48px;*/ /* Height of navbar */
    /* height: calc(100vh - 100px); */
    /* padding-top: .5rem; */
    /* overflow-x: hidden; */
	/* overflow-y: auto;  */
	/* Scrollable contents if viewport is shorter than content. */
/* } */ 
</style>