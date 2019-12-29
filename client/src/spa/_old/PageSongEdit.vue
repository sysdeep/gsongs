<template>
	<div>


		<h3 class="page-header">
			<span v-if="is_new">Создание записи</span>
			<span v-if="!is_new">Изменение записи <strong>{{ song_name }}</strong></span>
		</h3>



		<div class="row">
			<div class="col-md-5">
				<form class="form-horizontal">
			
					<div class="form-group">
						<label for="inputSinger" class="col-sm-3 control-label">Исполнитель</label>
						<div class="col-sm-9">
							<select class="form-control" v-model="song_edit.singer">
								<option v-for="(singer, index) in singers" :key="index" :value="singer.id">{{ singer.name }}</option>
							</select>
						</div>
					</div>


					<div class="form-group">
						<label for="inputName" class="col-sm-3 control-label">Название</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="inputName" placeholder="Название" v-model="song_edit.name">
						</div>
					</div>


					
					<div class="form-group">
						<label for="inputAuthor" class="col-sm-3 control-label">Автор</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="inputAuthor" placeholder="Автор" v-model="song_edit.author">
						</div>
					</div>



					<div class="form-group">
						<label for="inputAlbum" class="col-sm-3 control-label">Альбом</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="inputAlbum" placeholder="Альбом" v-model="song_edit.album">
						</div>
					</div>


					<div class="form-group">
						<label for="inputGenre" class="col-sm-3 control-label">Жанр</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="inputGenre" placeholder="Жанр" v-model="song_edit.genre">
						</div>
					</div>


					<div class="form-group">
						<label for="inputDescription" class="col-sm-3 control-label">Описание</label>
						<div class="col-sm-9">
							<textarea class="form-control" rows="3" id="inputDescription" placeholder="Описание" v-model="song_edit.description"></textarea>
						</div>
					</div>


					
					

					<hr>
				
				</form>


				<BtnBack />
				<div class="pull-right">
					<button-save @click="save"></button-save>
				</div>
			</div>
			<div class="col-md-7">
				<form class="form-horizontal">
			
					<div class="form-group">
						<textarea class="form-control mono" rows="25" id="inputText" placeholder="Текст" v-model="song_edit.text"></textarea>
					</div>

				</form>
			</div>
		</div>


		
	</div>
</template>


<script>
	import storage from "./storage";
	import {go_back, get_default_song} from "./utils";
	import net from "./net";
	
	export default {
		
		
		data: function(){
			return {
				"song_id"           : null,
				"is_new"            : false,

			}  
		},
		
		
		
		created: function(){
			this.song_id = this.$route.params.id;
			this.is_new = this.song_id == 0;
		},
		
		
		methods: {
			save: function(){


				if(this.is_new){
					
					this.$store.dispatch("song_create", this.song_edit).then((new_song_id) => {
						this.$router.push("/song/" + new_song_id);
					});
				}else{
					
					this.$store.dispatch("song_update", this.song_edit).then(() => {
						go_back();
					});
					
				}


				
				
			}
		},


		computed: {
			song: function(){
				return this.$store.getters.find_song(this.song_id);
			},

			song_name: function(){
				return this.song? this.song.name : "---";
			},

			song_edit: function(){
				if(this.is_new){
					let result = get_default_song();
					result.singer = this.$store.state.singer_id;
					return result;
				}else{
					return Object.assign({}, this.song);
				}
			},


			singers: function(){
				return this.$store.state.singers;
			}
		}
	}
</script>
