<template>
	<div class="container">
		<div class="header">singers</div>

		<div class="body">
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

		<div class="footer">footer</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
	methods: {
		is_current(item_id){
			return false;
		}
	},

	computed: {
        ...mapGetters(["singers", "singers_loaded", "singer"]),
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