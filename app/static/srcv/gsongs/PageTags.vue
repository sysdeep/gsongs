<template>
	<div v-if="is_ready">
		<h3 class="page-header">Список тэгов</h3>
	
		<div class="row">
			<div class="col-md-8">
				<table class="table table-bordered table-condensed">
					<thead>
						<tr>
							<th>id</th>
							<th>name</th>
							<th>songs</th>
							<th>options</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(tag, index) in state.tags" :key="index">
							<td>{{ tag.id }}</td>
							<td>
								<!-- <a href="/#/tag/ tag.id }}">{{ tag.name }}</a> -->
								<router-link :to="/tag/ + tag.id">{{tag.name}}</router-link>
							</td>
							<td>
								{{ get_songs_count(tag.id) }}
							</td>
							<td>
								<a href="javascript: void(0)" @click="show_edit(tag)">edit</a>
								|
								<a href="javascript: void(0)" @click="show_remove(tag)">remove</a>
							</td>
						</tr>
					</tbody>
				</table>
				<button-back></button-back>
				<button class="btn btn-primary" @click="show_create">Create</button>
			</div>
			<div class="col-md-4">
	
				<div v-if="is_edit">
					<form>
						<div class="form-group">
							<label for="tag_name">Название</label>
							<input type="text" class="form-control" id="tag_name" placeholder="Название" v-model="item_edit.name">
						</div>
	
					</form>
						<button class="btn btn-default" @click="save_edit">Save</button>
						<button class="btn btn-default" @click="hide_edit">cancel</button>
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
			"item_edit"	: null,
			"item_current": null,


			"links"		: []
		}
	},

	created: function(){
		this.refresh();
	},

	methods: {

		refresh: function(){
			this.is_edit = false;
			storage.fetch_tags().then(()=>{


				net.get_tags_songs().then(response => {
					console.log(response);
					this.links = response.data.result;

					this.is_ready = true;
				})
			})
		},

		show_edit: function(item){
			this.item_current = item;
			this.item_edit = Object.assign({}, item);
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
			this.is_edit = true;
		},

		show_remove: function(item){
			this.item_edit = item;

			let result = confirm("Удалить?");
			if(result){
				net.remove_tag(this.item_edit).then(response => {
					this.refresh();
				})
			}
		},

		save_edit: function(){
			if(this.item_edit.id == 0){
				net.create_tag(this.item_edit).then(response => {
					this.refresh();
				})
			}else{
				net.update_tag(this.item_edit).then(response => {
					this.refresh();
				})
			}
		},


		get_songs_count: function(tag_id){
			let result = this.links.filter(item => item.id_tag == tag_id);
			return result.length;
		}
	}
}
</script>

<style>

</style>
