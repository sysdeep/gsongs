<template>
	<div>
		<h3 class="page-header">Список тэгов</h3>

		<div class="alert alert-danger" role="alert" v-if="errors.length > 0">
			<ul>
				<li v-for="(err, i) in errors" :key="i">{{ err }}</li>
			</ul>
		</div>

		<!-- <block-spinner status="true"> -->
		
		<div v-if="errors.length == 0">
			<table class="table table-bordered table-sm table-striped">
				<thead>
					<tr width="60%">
						<!-- <th>id</th> -->
						<th class="pointer" @click.prevent="set_sort_field('name')">
							Название
							<sort-item class="pull-right" 
								dname="name" 
								:cname="sort_field" 
								:direction="sort_direction" 
								/>
						</th>
						<!-- <th>Кол-во песенок</th> -->
						<th width="20%" class="pointer" @click.prevent="set_sort_field('updated')">
							Дата изменения
							<sort-item class="pull-right"
								dname="updated" 
								:cname="sort_field" 
								:direction="sort_direction" 
								/>
						</th>
						<th width="20%">Опции</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(tag, index) in sorted_tags" :key="index">
						<!-- <td>{{ tag.id }}</td> -->
						<td>
							<router-link
								:to="/tag/ + tag.id"
								title="перейти на страницу метки"
								>{{ tag.name }}</router-link
							>
						</td>
						<!-- <td style="text-align: center">
							{{ get_songs_count(tag.id) }}
						</td> -->
						<td>
							{{ tag.updated }}
						</td>
						<td style="text-align: center">
							<a
								href="javascript: void(0)"
								@click="show_edit(tag)"
							>
								<i
									class="fa fa-pencil-square-o"
									aria-hidden="true"
								></i>
								изменить
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
			<span class="pull-right">
				<BtnRefresh @click="refresh" />
			</span>
		</div>
		<!-- </block-spinner> -->
		<Spinner v-if="is_loading" />
		<!-- <TstModal /> -->
	</div>
</template>

<script>
import { mapState } from "vuex";
import bus from "../bus";
import { actionTypes } from "../storage/modules/tags";
// import BlockSpinner from "@/components/BlockSpinner.vue";
import SortItem from "@/components/SortItem.vue";


// import TstModal from "./tcomponents/ModalCompWrap.vue"
export default {
	data(){
		return {
			sort_field 		: "name",
			sort_direction 	: 1,		// 1 - asc, -1 - desc
		}
	},

	components: {
		SortItem,
		// BlockSpinner
		// TstModal
	},

	methods: {
		refresh: function () {
			this.$store.dispatch(actionTypes.GetTags);
		},

		show_edit: function (item) {
			bus.$emit("show_edit_tag", item);
		},

		hide_edit: function () {
			this.is_edit = false;
		},

		show_create: function () {
			bus.$emit("show_create_tag");
		},

		// get_songs_count: function(tag_id){
		// 	let result = this.$store.getters.get_tag_songs(tag_id);
		// 	return result.length;
		// }

		set_sort_field(field_name){

			if(field_name === this.sort_field){
				this.sort_direction = this.sort_direction * -1;
			}
			
			this.sort_field = field_name;
		}
	},

	computed: {
		...mapState({
			tags: (state) => state.tags.tags,
			is_loading: (state) => state.tags.is_loading,
			errors: (state) => state.tags.errors,
		}),

		sorted_tags(){
			let items = [...this.tags];

			items.sort((a, b) => {
				let r = a[this.sort_field] > b[this.sort_field]? 1 : -1;
				return r * this.sort_direction;
			})

			return items;
		}
	},
};
</script>

<style>
</style>
