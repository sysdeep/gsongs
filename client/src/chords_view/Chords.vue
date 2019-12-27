<template>
	<div>

		<h4 class="page-header">Chords</h4>

		<input type="text" class="form-control" id="seach_term" placeholder="поиск" v-model="seach_term">

		<ul>
			<li v-for="(item, index) in fitems" :key="index">
				<a href="javascript: void(0)" @click="act_select(item)">{{ item }}</a>
			</li>
		</ul>


	</div>
</template>

<script>




export default {

	props: ["items"],

	components: {
		
	},

	data: function(){
		return {
			seach_term	: ""
		}
	},

	created: function(){
		
	},

	methods: {
		act_select: function(item){
			this.$emit("selected", item);
		},
	},

	computed: {
		fitems(){
			let search_text = this.seach_term.toLowerCase();
			return this.items.filter(item => {
				let item_text = item.toLowerCase();
				return item_text.indexOf(search_text) > -1;
			})
		}
	}

}
</script>

<style>

</style>
