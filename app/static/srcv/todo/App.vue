<template>
	<div>

		<h3 class="page-header">Список задач</h3>


		<div class="pull-right">
			<button class="btn btn-primary" ng-click="self.add()">add</button>
			<button class="btn btn-primary" @click="refresh">refresh</button>
		</div>

		<br>
		<br>

		<div v-for="(titem, index) in this.items" :key="index">
			<todo-item :item="titem"></todo-item>
		</div>


	</div>
</template>

<script>
import component_item from "./Item.vue";
import {get_items} from "./net";


export default {

	components: {
		"todo-item": component_item
	},

	data: function(){
		return {
			"items"		: []
		}
	},

	created: function(){
		this.refresh();
	},

	methods: {
		refresh: function(){
			get_items().then(response => {
				this.items = response.data.items;
			})
		}
	}

}
</script>

<style>

</style>
