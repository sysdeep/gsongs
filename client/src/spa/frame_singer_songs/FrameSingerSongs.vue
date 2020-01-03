<template>
<div class="row">
    <nav class="col-md-4 d-none d-md-block bg-light sidebar">

        <Spinner v-if="!singer_loaded"/>

        <div class="sidebar-sticky-before">
            <input type="text" class="form-control" />
        </div>


        <div class="sidebar-sticky">

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


        <div class="sidebar-sticky-after">
            

            <button class="btn btn-primary" @click="show_add_song">add</button>

            <span class="text-right">
                Всего: {{ singer_songs.length }}
            </span>

            <div>
                {{ singer }}
            </div>

    
        </div>


    </nav>



    <div class="col-md-8">
        <router-view></router-view>
    </div>


</div>
</template>



<script>
import {mapGetters} from 'vuex';
import bus from "../bus";
export default {
    data(){
        return {
            "singer_id" : null,
        }
    },

    created(){
		this.refresh();
	},


	watch: {
		"$route": function(to, from){
            // console.log(to, from)
			this.refresh();
		}
	},


	

	methods: {
		
		refresh(){
            let singer_id = this.$route.params.singer_id;

            if(this.singer_id != singer_id){
                this.$store.dispatch("get_singer", singer_id);
                this.singer_id = singer_id;
            }

        },


        show_add_song(){
            bus.$emit("show_create_song_for_singer", this.singer.id);
        },

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

.sidebar{
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    /* height: 100vmax; */

    /* top: 0;
    bottom: 0;
    padding: 0;
    left: 200px;
    position: fixed; */
}

.sidebar-sticky-before {
    position: -webkit-sticky;
    position: sticky;
    top: 50px; /*48px;*/ /* Height of navbar */
    height: 50px;
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}


.sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 100px; /* Height of navbar */
    height: calc(100vh - 400px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}


.sidebar-sticky-after {
    /* border: solid 1px; */
    position: -webkit-sticky;
    position: sticky;
    top: calc(100vh - 270px); /* Height of navbar */
    /* height: calc(100vh - 120px); */
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}






.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}


.sidebar .nav-link.active {
  color: #007bff;
}

</style>