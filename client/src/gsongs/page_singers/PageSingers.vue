<template>
	<div>



		<!-- <span class="pull-right">
			<div class="row">
				<div class="col-md-6"><input type="text" class="form-control" placeholder="Быстрый поиск названию" v-model="search_name"></div>
				<div class="col-md-6">

					<div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default">Left</button>
  <button type="button" class="btn btn-default">Middle</button>
  <button type="button" class="btn btn-default">Right</button>
</div>
				</div>
			</div>
			
		</span> -->

		<!-- <h3 class="page-header">Список исполнителей</h3> -->
	
	   <!-- <c-qqq></c-qqq> -->


		<h3 class="page-header">
			Список исполнителей
			<small>{{ singers.length }}</small>
			
		</h3>

		<Spinner v-if="!singers_loaded" />
	
		<div class="row">
			<div class="col-md-6 col-sm-6 col-xs-6">
				<input type="text" class="form-control" v-model="search_name" placeholder="быстрый поиск">
			</div>
			<div class="col-md-6 col-sm-6">
				<div class="pull-right">

					<!-- <router-link class="btn btn-success" to="/singer_edit/0" title="добавить запись">
						<i class="fa fa-plus" aria-hidden="true"></i> Добавить
					</router-link> -->

					<!-- <button class="btn btn-success" @click="show_create_singer" title="добавить запись">
						<i class="fa fa-plus" aria-hidden="true"></i> Добавить
					</button> -->



					<!-- <button class="btn btn-default" @click="refresh" title="загрузить список">
						<i class="fa fa-refresh" aria-hidden="true"></i> Обновить
					</button> -->

					<BtnCreate @click="show_create_singer()" />

					<BtnRefresh :loading="!singers_loaded" @click="refresh()"/>
					
				</div>
			</div>
		</div>


		<!-- <nav class="navbar navbar-default">
			<div class="container-fluid">
	
				<div class="navbar-header">
					
					<span class="navbar-brand">
						Список исполнителей
					</span>
	
				</div>
	
				<form class="navbar-form navbar-left" role="search">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Быстрый поиск названию" v-model="search_name">
					</div>
				</form>
	
				<ul class="nav navbar-nav navbar-right">
					<li>
						<a href="javascript: void(0)" @click="refresh" title="обновить список">
							<i class="fa fa-refresh" aria-hidden="true"></i> Обновить
						</a>
					</li>
					<li>
	
						<a href="#/singer_edit/0" title="отобразить диалог добавления">
							<i class="fa fa-plus" aria-hidden="true"></i> Добавить
						</a>
					</li>
				</ul>
	
			</div>
		</nav> -->
	
		<!--<chars select="self.select_char(char_value)"></chars>-->
	
		<br>
	
		<table class="table table-bordered table-sm">
			<thead>
				<tr>
					<!-- <th>id</th> -->
					<th class="pointer" @click="sort()">
						Исполнитель
						<SortItem class="pull-right" dname="name" cname="name" :direction="sort_dir" />
					</th>
					<!-- <th>
						<a href="javascript: void(0)" ng-click="self.sort('created')">Создание</a>
					</th>
					<th>
						<a href="javascript: void(0)" ng-click="self.sort('updated')">Обновление</a>
					</th> -->
					<th>Опции</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(singer, index) in singers_filtered" :key="index">
					<!-- <td>{{ singer.id }}</td> -->
					<td>
						<router-link :to="/singer/ + singer.id" title="перейти на страницу исполнителя">
							{{ singer.name }}
						</router-link>
					</td>
					<!--<td>{{ singer.created | date:'yyyy-MM-dd' }}</td>-->
					<!-- <td>{{ singer.created }}</td>
					<td>{{ singer.updated }}</td> -->
					<td style="text-align: center">
						
						<a href="javascript: void(0)" title="изменить запись" @click="show_edit_singer(singer.id)">
							<i class="fa fa-pencil"></i> изменить
						</a>

						<!-- <router-link :to="/singer_edit/ + singer.id" title="изменить запись">
							<i class="fa fa-pencil"></i> изменить
						</router-link> -->
						<!-- |
							<a href="javascript: void(0)" ng-click="show_remove_singer(singer)" title="отобразить запрос удаления">
								<i class="fa fa-trash-o"></i> удалить
							</a> -->
					</td>
				</tr>
			</tbody>
		</table>




		<!-- <div class="pull-right">
			<a class="btn btn-success" href="#/singer_edit/0" title="добавить запись">
				<i class="fa fa-plus" aria-hidden="true"></i> Добавить
			</a>
		</div> -->




		<!-- <c-modal-edit></c-modal-edit> -->
	
	</div>
</template>



<script>
import {mapGetters} from "vuex";
import bus from "../bus";
import SortItem from "../components/SortItem.vue";

export default {
	data: () => {
		return {

			"search_name": "",

			"sort_dir"  : 1,		// 1 asc, -1 desc
		}
	},

	components: {
		SortItem,
	},
	

	methods: {
		show_create_singer(){
			bus.$emit("show_create_singer");
		},

		show_edit_singer(singer_id){
			bus.$emit("show_edit_singer", singer_id);
		},


		refresh: function(){
			this.$store.dispatch("fetch_singers").then(() => {
				this.$toastr.success("Список обновлён");
			});
		},

		sort: function(){
			this.sort_dir = this.sort_dir * -1;
		}
	},


	computed: {
		...mapGetters(["singers", "singers_loaded"]),

		

		singers_filtered: function(){
			var s_name = this.search_name.toLowerCase();
			let result = this.singers.filter((item)=>{
				let index = item.name.toLowerCase().indexOf(s_name);
				return index > -1;
			});

			result.sort((a, b) => {
				let r = (a.name > b.name) ? 1 : -1;
				return r * this.sort_dir;
			})
			return result;
		}
	}

	



}
</script>