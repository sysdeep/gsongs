<template>
<!-- <nav class="col-md-2 d-none d-md-block bg-light sidebar11" id="sidebar111"> -->
<div id="singers_side"
class="col-md-311 d-none11 d-md-block11 bg-light11 column_field11 column_breaker11">


    <SectionHeader>
        <input type="text" class="form-control" />
    </SectionHeader>
    
    <!-- <hr /> -->

    <div class="column_scroll_q">
        
        <!-- <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
            </a>
        </h6> -->
        
        <ul class="nav flex-column" id="sidebar1_items1">
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

	<!-- <hr /> -->

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

#singers_side{
    min-width: 250px;
    width: 250px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #b8b8b8;
}


.column_scroll_q{
	height: calc(100vh - 50px - 50px - 50px);
    overflow-x: hidden;
    overflow-y: auto;
}




.nav-link {
  font-weight: 500;
  color: #333;

  padding: .3rem 1rem;
}


.nav-link.active {
  background-color: #007bff;
}

</style>