<template>
	<div>
		singer page

		<Info />

		<Songs />
	</div>
</template>


<script>
import Info from "./Info.vue";
import Songs from "./Songs.vue";
export default {
	
	components: {
		Info, 
		Songs
	},

	created(){
		this.refresh();
	},

	watch: {
		"$route": function(to, from){
			this.refresh();
		}
	},


	methods: {
		refresh(){
			let singer_id = this.$route.params.id;
			console.log(singer_id);
			this.$store.dispatch("get_singer", singer_id);
		},
	}
}
</script>