<template>
	<div class="card">
		select



		<Singers @select="on_select_singer" v-show="page == 1"/>
		<Singer @back="on_back" v-show="page == 2"/>



	</div>
</template>

<script>
import Singers from "./Singers.vue";
import Singer from "./Singer.vue";

export default {

	data(){
		return {
			page 		: 1
		}
	},
	
	components: {
		Singers,
		Singer
	},


	methods: {
		on_select_singer(singer){
			console.log(singer);
			this.page = 2
		},

		on_back(){
			this.page = 1;
		}
	}
}
</script>