<template>
	<div>
		
		<div class="row">
			<div class="col-md-6">
				<form>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Быстрый поиск названию" v-model="filter_songs">
					</div>
				</form>

			</div>
			<div class="col-md-6">
				<div class="pull-right">
				

					<BtnCreate @click="add_song()" title="добавить запись">Добавить</BtnCreate>
					
				</div>
			</div>
		</div>

		<table class="table table-bordered table-sm">
			<thead>
				<tr>
					<th>
						<a href="javascript: void(0)" @click="act_sort('name')">Название</a>
					</th>
					<!-- <th>Автор</th>
				<th>Альбом</th>
				<th>Описание</th>
				<th>Жанр</th> -->
				</tr>
			</thead>
			<tbody>
				<tr v-for="(song, index) in filtered_songs" :key="index">
					<td>
						<router-link :to="/song/ + song.id" title="перейти к странице песни">{{ song.name }}</router-link>
					</td>
					<!-- <td>[[ song.author ]]</td>
				<td>[[ song.album ]]</td>
				<td>[[ song.description ]]</td>
				<td>[[ song.genre ]]</td> -->
					
				</tr>
				
			</tbody>
		</table>
		<div class="pull-right">
			Всего: {{ songs.length }}
		</div>

	</div>
</template>



<script>
import {mapGetters} from "vuex";
export default {
	props: ["songs"],

	data: function(){
		return {
			"filter_songs"		: "",
			"sort_dir"			: false
		}
	},



	methods: {
		add_song: function(){
			this.$emit("addsong");
		},


		act_sort(field){
            this.sort_dir = !this.sort_dir;
		}
	},



	computed: {

		// ...mapGetters(["songs"]),

		ssongs: function(){
			

			
			return [...this.songs].sort((a, b) =>{
                if(this.sort_dir){
                    return (a.name < b.name)? 1 : -1;
                }else{
                    return (a.name > b.name)? 1 : -1;
                }
            })

            
		},

		filtered_songs: function(){
			let lfind = this.filter_songs.toLowerCase();
            return this.ssongs.filter(item => {
                let name = item.name.toLowerCase();
                return name.indexOf(lfind) > -1;
            })
		}
	}

}
</script>