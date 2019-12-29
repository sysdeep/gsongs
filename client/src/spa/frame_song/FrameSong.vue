<template>
<div>

    Song


    {{ song }}
</div>
</template>


<script>
import {mapGetters} from 'vuex';
export default {
    
     created(){
		this.refresh();
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
        ...mapGetters(["song"]),

    }


}
</script>