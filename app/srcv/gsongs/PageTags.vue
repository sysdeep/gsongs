<template>
	<div>
		<h3 class="page-header">Список тэгов</h3>
	
		
			<table class="table table-bordered table-sm">
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


			<BtnBack />
			<BtnCreate @click="show_create">Добавить</BtnCreate>
			
		</div>
	</div>
</template>

<script>
import bus from "./bus";
export default {

	methods: {

		refresh: function(){

			this.$store.dispatch("fetch_tags");

		},

		show_edit: function(item){
			bus.$emit("show_edit_tag", item);
	
		},

		hide_edit: function(){
			this.is_edit = false;
		},

		show_create: function(){
			bus.$emit("show_create_tag");
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
