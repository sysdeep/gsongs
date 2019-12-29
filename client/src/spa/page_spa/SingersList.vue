<template>
	<div class="card" style="max-height: 300px">
		<!-- <div class="card-header">
			Исполнители
			<span class="pull-right badge badge-secondary">{{ singers.length }}</span>
		</div> -->

		<div class="card-body">
			
			<!-- <div class="input-group">
				<input type="text" class="form-control" v-model="singer_filter" placeholder="быстрый поиск">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary" type="button" @click="singer_filter = ''">&nbsp <i class="fa fa-times" aria-hidden="true"></i> &nbsp</button>
					</div>
			</div> -->
		</div>

		<br>

		<ul class="list-unstyled1">
			<li v-for="(singer, i) in fsingers" :key="i">
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
			"singer_filter"		: "",
			"current_singer"	: null
		}
	},

	methods: {
		select_singer: function(singer){
			this.$store.dispatch("get_singer", singer.id);
			// console.log(singer);
			// this.current_singer = singer;
			// this.$emit("select_singer", singer);
			// this.$store.dispatch("select_singer", singer);
			// this.$store.dispatch("set_singer_id", singer.id);
		}
	},

	computed: {

		...mapGetters(["singers"]),

		fsingers: function(){
			let lfind = this.singer_filter.toLowerCase();
			return this.singers.filter((item) => {
				let name = item.name.toLowerCase();
				return name.indexOf(lfind) > -1;
			}).slice(0, 10);
		},
	}
}
</script>