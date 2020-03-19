<template>
	<div class="container">
		<div class="header">singer songs</div>

		<div class="body">
			<ul class="nav flex-column" id="sidebar2_items">
            
                <li class="nav-item" v-for="(song, i) in singer_songs" :key="i">
                    <!-- <a class="nav-link active" href="#"> -->
                    <router-link class="nav-link" :class="{'active': is_current(song.id)}" :to="'/singer/' + singer_id + '/song/' + song.id">
                        <span data-feather="home"></span>
                        {{ song.name }} 
                        <!-- <span class="sr-only">(current)</span> -->
                    </router-link>
                </li>
            </ul>

		</div>

		<div class="footer">footer</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
// import bus from "../bus";

// import SectionHeader from "../components/SectionHeader.vue";
// import SectionFooter from "../components/SectionFooter.vue";

export default {
    data(){
        return {
            "singer_id" : null,
        }
    },

    components: {
        // SectionHeader,
        // SectionFooter
    },

    created(){
		// this.refresh();
	},


	// watch: {
	// 	"$route": function(to, from){
    //         // console.log(to, from)
	// 		this.refresh();
	// 	}
	// },


	

	methods: {
		
		// refresh(){
        //     let singer_id = this.$route.params.singer_id;

        //     if(this.singer_id != singer_id){
        //         this.$store.dispatch("get_singer", singer_id);
        //         this.singer_id = singer_id;
        //     }

        // },


        // show_add_song(){
        //     bus.$emit("show_create_song_for_singer", this.singer.id);
        // },

        is_current(song_id){
            if(!this.song) return false;

            return this.song.id == song_id;
        }
    },

    computed: {
        ...mapGetters(["singer_songs", "singer", "singer_loaded", "song"]),

    }
}
</script>

<style scoped>
.container{
	width: 300px;
	border: 1px solid gray;
	display: flex;
    flex-direction: column;
}
.header{
	display: flex;
    padding: 5px;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #b8b8b8;
}

.footer{
    display: flex;
    padding: 5px;
    align-items: center;
    height: 50px;
    border-top: 1px solid #b8b8b8;
    /* background-color: aquamarine; */
}

.body{
	height: calc(100vh - 50px - 50px - 50px);
    overflow-x: hidden;
    overflow-y: visible;
}
</style>