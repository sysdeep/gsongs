<template>
<div class="row11111" id="singer_content">
    <div 
        class="col-md-4111 d-none111 d-md-block111 bg-light1111 column_field111 column_breaker1111"
        id="singers_side"
    >

        <Spinner v-if="!singer_loaded"/>

        <SectionHeader>
			<input type="text" class="form-control" />
			
		</SectionHeader>

		<!-- <hr /> -->

        <div class="column_scroll_q" >

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

        <div id="singer_info">
            Singer info

            <p>
                {{ singer }}
            </p>
        </div>

		<!-- <hr /> -->

        <SectionFooter>

            <button class="btn btn-primary" @click="show_add_song">add</button>

            <span class="text-right">
                Всего: {{ singer_songs.length }}
            </span>

            <!-- <div>
                {{ singer }}
            </div> -->

    
        </SectionFooter>


    </div>



    <div class="col-md-811111">
        <router-view></router-view>
    </div>


</div>
</template>



<script>
import {mapGetters} from 'vuex';
import bus from "../bus";

import SectionHeader from "../components/SectionHeader.vue";
import SectionFooter from "../components/SectionFooter.vue";

export default {
    data(){
        return {
            "singer_id" : null,
        }
    },

    components: {
        SectionHeader,
        SectionFooter
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


#singer_content{
    display: flex;
    flex-direction: row;
    flex-grow: 1;
}

#singers_side{
    min-width: 250px;
    width: 250px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #b8b8b8;
}


.column_scroll_q{
	height: calc(100vh - 50px - 50px - 50px - 200px);
    overflow-x: hidden;
    overflow-y: auto;
}


#singer_info{
    height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    border-top: 1px solid #b8b8b8;
}












.nav-link {
  font-weight: 500;
  color: #333;

  padding: .3rem 1rem;
}


.nav-link.active {
  background-color: #007bff;
}











/* ------------------ old --------------------------- */
.sidebar{
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    height: 100vh;
	padding-top: 50px;

    /* top: 0;
    bottom: 0;
    padding: 0;
    left: 200px;
    position: fixed; */
}

.sidebar-sticky-before {
    /* position: -webkit-sticky;
    position: sticky; */
    /* top: 50px;  */
	/*48px;*/ /* Height of navbar */
    height: 50px;
    /* padding-top: .5rem; */
	margin-top: 20px;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}


.sidebar-sticky {
    /* position: -webkit-sticky;
    position: sticky; */
    /* top: 100px;  */
	/* Height of navbar */
    height: calc(100vh - 300px);
    /* padding-top: .5rem; */
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}


.sidebar-sticky-after {
    /* border: solid 1px; */
    /* position: -webkit-sticky;
    position: sticky; */
    /* top: calc(100vh - 270px);  */
	/* Height of navbar */
    /* height: calc(100vh - 120px); */
    /* padding-top: .5rem; */
	/* height: 60px; */
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

</style>