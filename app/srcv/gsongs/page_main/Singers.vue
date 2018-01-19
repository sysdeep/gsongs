<template>
	<div>
		<h4 class="page-header">
			Исполнители
			<span class="pull-right badge">{{ singers.length }}</span>
		</h4>

		<div class="input-group">
			<input type="text" class="form-control" v-model="singer_filter" placeholder="быстрый поиск">
			<span class="input-group-btn">
				<button class="btn btn-default" type="button" @click="singer_filter = ''">&nbsp <i class="fa fa-times" aria-hidden="true"></i> &nbsp</button>
				</span>
		</div>

		<br>

		<ul class="list-unstyled">
			<li v-for="singer in fsingers">
				<a href="javascript: void(0)" @click="select_singer(singer)" title="отобразить список песенок для этого исполнителя">
					<i v-if="singer == current_singer" class="fa fa-arrow-right" aria-hidden="true"></i>

					{{ singer.name }}

					
				</a>
			</li>
		</ul>
	</div>
</template>




<script>
export default {

	data: function(){
		return {
			"singer_filter"		: "",
			"current_singer"	: null
		}
	},

	methods: {
		select_singer: function(singer){
			this.$store.dispatch("select_singer", singer);
			// this.$store.dispatch("set_singer_id", singer.id);
			this.current_singer = singer;
		}
	},

	computed: {

		singers: function(){
			return this.$store.state.singers;
		},

		fsingers: function(){
			let lfind = this.singer_filter.toLowerCase();
			return this.$store.state.singers.filter((item) => {
				let name = item.name.toLowerCase();
				return name.indexOf(lfind) > -1;
			});
		},
	}
}
</script>