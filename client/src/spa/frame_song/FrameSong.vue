<template>
<div id="song_frame">

    <div v-if="song">
        <!-- title -->
        <h4>{{ singer_name }} - {{ song.name }}</h4>
        <!-- title -->

        <SongText :text="song.text" />

        {{ song }}
    </div>

    
</div>
</template>


<script>
import {mapGetters} from 'vuex';
import SongText from "./SongText.vue";
export default {
    
    created(){
		this.refresh();
	},

    components: {
        SongText
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
        },
    },

    computed: {
        ...mapGetters(["song", "singer"]),

        singer_name(){
            return this.singer? this.singer.name : "---";
        }
    }


}
</script>


<style scoped>
#song_frame{
     position: -webkit-sticky;
    position: sticky;
    top: 50px; /*48px;*/ /* Height of navbar */
    height: calc(100vh - 80px);
    /* padding-top: .5rem; */
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
</style>