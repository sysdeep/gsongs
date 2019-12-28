<template>
	<div>
		singers


		<ul class="list-unstyled1">
			<li v-for="(singer, i) in singers" :key="i">
				<a href="javascript: void(0)" @click.prevent="select_singer(singer)"  title="отобразить список песенок для этого исполнителя">
					<!-- <i v-if="singer == current_singer" class="fa fa-arrow-right" aria-hidden="true"></i> -->

					{{ singer.name }}
					
				</a>
			</li>
		</ul>


	</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {

	data: function(){
		return {
			
		}
	},

	methods: {
		select_singer: function(singer){
			this.$emit("select", singer);
			// this.$store.dispatch("get_singer", singer.id);
			// console.log(singer);
			// this.current_singer = singer;
			// this.$emit("select_singer", singer);
			// this.$store.dispatch("select_singer", singer);
			// this.$store.dispatch("set_singer_id", singer.id);
		}
	},

	computed: {

		...mapGetters(["singers"]),

		// fsingers: function(){
		// 	let lfind = this.singer_filter.toLowerCase();
		// 	return this.singers.filter((item) => {
		// 		let name = item.name.toLowerCase();
		// 		return name.indexOf(lfind) > -1;
		// 	}).slice(0, 10);
		// },
	}
}
</script>