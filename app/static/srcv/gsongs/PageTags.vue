<template>
	<div>
		<h3 class="page-header">Список тэгов</h3>
	
		<div class="row">
			<div class="col-md-8">
				<table class="table table-bordered table-condensed">
					<thead>
						<tr>
							<!-- <th>id</th> -->
							<th>Название</th>
							<th>Кол-во песенок</th>
							<th>Опции</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(tag, index) in ftags" :key="index">
							<!-- <td>{{ tag.id }}</td> -->
							<td>
								<router-link :to="/tag/ + tag.id" title="перейти на страницу метки">{{tag.name}}</router-link>
							</td>
							<td style="text-align: center">
								{{ get_songs_count(tag.id) }}
							</td>
							<td style="text-align: center">
								<a href="javascript: void(0)" @click="show_edit(tag)">
									<i class="fa fa-pencil-square-o" aria-hidden="true"></i> изменить
								</a>
								<!-- |
								<a href="javascript: void(0)" @click="show_remove(tag)">
									<i class="fa fa-trash" aria-hidden="true"></i> удалить
								</a> -->
							</td>
						</tr>
					</tbody>
				</table>
				<button-back></button-back>
				<button class="btn btn-primary" @click="show_create">
					<i class="fa fa-plus" aria-hidden="true"></i>
					Добавить
				</button>
			</div>
			<div class="col-md-4">
	
				<div v-if="is_edit">

					<h4 v-if="is_new">Создание</h4>
					<h4 v-if="!is_new">Изменение</h4>

					<form>
						<div class="form-group">
							<label for="tag_name">Название</label>
							<input type="text" class="form-control" id="tag_name" placeholder="Название" v-model="item_edit.name">
						</div>
	
					</form>

					
					<button class="btn btn-default" @click="hide_edit">
						<i class="fa fa-ban" aria-hidden="true"></i> Отмена
					</button>	
					
					<div class="pull-right">
						<button class="btn btn-danger" @click="show_remove" :disabled="get_songs_count(item_edit.id) > 0" v-if="!is_new">
								<i class="fa fa-trash" aria-hidden="true"></i> удалить
						</button>

						<button class="btn btn-primary" @click="save_edit">
							<i class="fa fa-floppy-o" aria-hidden="true"></i> Сохранить
						</button>
					</div>
					
					
				</div>
	
			</div>
		</div>
	</div>
</template>

<script>
import storage from "./storage";
import net from "./net";

export default {
	data: function(){
		return {
			"state"		: storage.state,
			"is_ready"	: false,
			"is_edit"	: false,
			"is_new"	: false,
			"item_edit"	: null,
			"item_current": null,


			"links"		: []
		}
	},

	created: function(){
		// this.refresh();
		
		
	},

	methods: {

		refresh: function(){

			this.$store.dispatch("fetch_tags");

		},

		show_edit: function(item){
			this.item_current = item;
			this.item_edit = Object.assign({}, item);
			this.is_new = false;
			this.is_edit = true;
		},

		hide_edit: function(){
			this.is_edit = false;
		},

		show_create: function(){
			this.item_edit = {
				"name" 	: "",
				"id"	: 0
			}
			this.is_new = true;
			this.is_edit = true;
		},

		show_remove: function(){
			// this.item_edit = item;

			let result = confirm("Удалить?");
			if(result){
				net.remove_tag(this.item_edit).then(response => {
					this.refresh();
				})
			}
		},

		save_edit: function(){
			if(this.is_new){
				net.create_tag(this.item_edit).then(response => {
					this.refresh();
					this.is_edit = false;
				})
			}else{
				net.update_tag(this.item_edit).then(response => {
					this.refresh();
					this.is_edit = false;
				})
			}
		},


		get_songs_count: function(tag_id){
			let result = this.$store.getters.get_tag_songs(tag_id);
			return result.length;
		}
	},



	computed: {
		ftags: function(){
			return this.$store.state.tags;
		}
	}
}
</script>

<style>

</style>
