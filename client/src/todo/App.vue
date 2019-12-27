<template>
	<div>

		<h3 class="page-header">Список задач</h3>



		<div class="row">
			<div class="col-md-3">


				<button class="btn btn-success" @click="show_add"><i class="fa fa-plus" aria-hidden="true"></i> Добавить</button>
				<button class="btn btn-default" @click="refresh"><i class="fa fa-refresh" aria-hidden="true"></i> Обновить</button>

				<br>
				<br>

				<ul class="nav nav-pills nav-stacked">
  					
  					<li v-for="(status, index) in statuses" :key="index" role="presentation" :class="{active: page == index}">
  						<a href="javascript: void(0)" @click="set_page(index)">
  							{{ status }}
  							<span class="badge pull-right">{{ get_status_count(index) }}</span>
  						</a>
  					</li>
  					<li><hr></li>
  					<li role="presentation" :class="{active: page == all_statuses}">
  						<a href="javascript: void(0)" @click="set_page(all_statuses)">
  							Все 
  							<span class="badge pull-right">{{ get_status_count(all_statuses) }}</span>
  						</a>
  					</li>
  					
				</ul>
			</div>
			<div class="col-md-9">
				<div v-for="(titem, index) in sitems" :key="index">
					<todo-item :item="titem" :statuses="statuses" @on-edit="show_edit" @on-remove="show_remove"></todo-item>
				</div>
			</div>

		</div>


		



		<modal-edit 
			:showed="is_edit" :item="item_edit" :statuses="statuses"
			@on-cancel="is_edit = false" @on-apply="save"
			></modal-edit>

	</div>
</template>

<script>
import component_item from "./Item.vue";
import component_modal from "./ModalEdit.vue";
import {get_items, add_item, update_item, remove_item} from "./net";

function get_default(){

	return {
		"id" 			: 0,
		"title"			: "",
		"description"	: "",
		"status"		: 0,
		"priority"		: 0
	}
}


var STATUSES = [
	"Новое",
	"В работе",
	"Завершено",
	"Отменено"
]

export default {

	components: {
		"todo-item"    	: component_item,
		"modal-edit"	: component_modal
	},

	data: function(){
		return {
			"items"		: [],
			"item_edit"	: get_default(),
			"statuses"	: STATUSES,
			"page"		: 0,

			"all_statuses" 	: 1000,

			"is_edit"	: false
		}
	},

	created: function(){
		this.refresh();
	},

	methods: {
		refresh: function(){
			get_items().then(response => {
				let result = response.data.items;
				result.sort((a, b) => {
					return a.priority < b.priority
				})
				this.items = result;
			})
		},

		show_edit: function(item){
			this.item_edit = Object.assign({}, item);
			this.is_edit = true;
		},

		show_add: function(){
			this.item_edit = get_default();
			this.is_edit = true;	
		},

		show_remove: function(item){
			let result = confirm("Удалить запись?");
			if(!result) return false;
			
			remove_item(item).then(response => {
				this.refresh();
			})
		},

		save: function(item){
			if(item.id == 0){
				add_item(item).then(response => {
					this.is_edit = false;
					this.refresh();
				});
			}else{
				update_item(item).then(response => {
					this.is_edit = false;
					this.refresh();
				});
			}
		},



		set_page: function(page){
			this.page = page;
		},

		get_status_count: function(status){
			if(status == this.all_statuses){
				return this.items.length;
			}

			let result = this.items.filter(item => item.status == status);
			return result.length;
		}
	},

	computed: {
		sitems: function(){
			if(this.page == this.all_statuses){
				return this.items;
			}

			let result = this.items.filter(item => item.status == this.page);
			return result;
		}
	}

}
</script>

<style>

</style>
