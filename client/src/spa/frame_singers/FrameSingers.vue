<template>
<!-- <nav class="col-md-2 d-none d-md-block bg-light sidebar11" id="sidebar111"> -->
<div class="col-md-3 d-none d-md-block bg-light1 sidebar">


    <div class="sidebar-sticky-before">
        <input type="text" class="form-control" />
    </div>
    
    
    <div class="sidebar-sticky">
        
        <!-- <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
            </a>
        </h6> -->
        
        <ul class="nav flex-column" id="sidebar1_items">
            <li class="nav-item" v-for="(singer, i) in singers" :key="i">
                <!-- <a class="nav-link active" href="#"> -->
                <router-link class="nav-link" :class="{'active': is_current(singer.id)}" :to="'/singer/' + singer.id">
                    <!-- <span data-feather="home"></span> -->
                    {{ singer.name }} 
                    <!-- <span class="sr-only">(current)</span> -->
                </router-link>
            </li>
        </ul>

        
    </div>

    <div class="sidebar-sticky-after">
        <button class="btn btn-primary" @click="show_add_song">add</button>

        <span class="text-right">
            Всего: {{ singers.length }}
        </span>
    </div>
<!-- </nav> -->
</div>
</template>


<script>
import {mapGetters} from "vuex";
import bus from "../bus";
export default {
    
    methods: {
        show_add_song(){
            bus.$emit("show_create_singer");
        },

        is_current(singer_id){
            if(!this.singer)    return false;

            return this.singer.id == singer_id;
        }
    },

    computed: {
        ...mapGetters(["singers", "singers_loaded", "singer"]),

    }
}
</script>

<style scoped>
.sidebar{
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    /* height: 100vmax; */
    /* height: 100vh; */
    /* top: 0;
    bottom: 0;
    padding: 0;
    position: fixed; */
}

.sidebar-sticky-before {
    position: -webkit-sticky;
    position: sticky;
    top: 60px; /*48px;*/ /* Height of navbar */
    height: 50px;
    /* padding-top: .5rem; */
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
	border: 1px solid grey;
}


.sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 110px; /* Height of navbar */
    height: calc(100vh - 250px);
	/* bottom: 50px; */
    /* padding-top: .5rem; */
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
	border: 1px solid grey;
}


.sidebar-sticky-after {
    position: -webkit-sticky;
    position: sticky;
    top: calc(100vh - 60px);
	/* bottom: 0; */
    height: 60px;
    /* padding-top: .5rem; */
    /* overflow-x: hidden; */
    /* overflow-y: auto;  */
	border: 1px solid grey;
}






.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}


.sidebar .nav-link.active {
  color: #007bff;
}

/* 


.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}



.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
} */

</style>