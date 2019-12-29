<template>
<!-- <nav class="col-md-2 d-none d-md-block bg-light sidebar11" id="sidebar111"> -->
<div class="col-md-3 d-none d-md-block bg-light sidebar">


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
                <router-link class="nav-link" :to="'/singer/' + singer.id">
                    <!-- <span data-feather="home"></span> -->
                    {{ singer.name }} 
                    <!-- <span class="sr-only">(current)</span> -->
                </router-link>
            </li>
        </ul>

        
    </div>

    <div class="sidebar-sticky-after">
        <button class="btn btn-primary">add</button>

        <span class="text-right">
            Всего: {{ singers.length }}
        </span>
    </div>
<!-- </nav> -->
</div>
</template>


<script>
import {mapGetters} from "vuex";
export default {
    

    computed: {
        ...mapGetters(["singers", "singers_loaded"]),

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
    height: calc(100vh - 200px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}


.sidebar-sticky-after {
    position: -webkit-sticky;
    position: sticky;
    top: calc(100vh - 70px); /* Height of navbar */
    height: 50px;
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}








/* .sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
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