<template>
<!-- <nav class="col-md-2 d-none d-md-block bg-light sidebar11" id="sidebar111"> -->
<div class="col-md-3 d-none d-md-block bg-light column_field column_breaker">


    <SectionHeader>
        <input type="text" class="form-control" />
    </SectionHeader>
    
    <hr />

    <div class="column_scroll">
        
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

	<hr />

    <SectionFooter>
		
        <button class="btn btn-primary" @click="show_add_song">add</button>

        <span class="text-right">
            Всего: {{ singers.length }}
        </span>
    </SectionFooter>
<!-- </nav> -->
</div>
</template>


<script>
import {mapGetters} from "vuex";
import bus from "../bus";
import SectionHeader from "../components/SectionHeader.vue";
import SectionFooter from "../components/SectionFooter.vue";

export default {
    components: {
        SectionHeader,
        SectionFooter
    },

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



.nav-link {
  font-weight: 500;
  color: #333;
}


.nav-link.active {
  color: #007bff;
}

</style>