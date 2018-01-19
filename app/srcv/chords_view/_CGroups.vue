<template>
	<div>

		<h4 class="page-header">Groups</h4>

		<ul>
			<li v-for="(item, index) in items" :key="index">
				<a href="javascript: void(0)" @click="act_select(item)">{{ item.name }}</a>
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
			current_id		: null
		}
	},

	created: function(){
		
	},

	methods: {
		act_select: function(item){
			this.current_id = item.id;
			this.$emit("selected", item.id);
		},

		is_active: function(item){
			return item.id == this.current_id;
		}

	},

	computed: {
		
	}

}
</script>

<style>

</style>
