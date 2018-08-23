<template>
<div class="modal fade" tabindex="-1" role="dialog" id="modal_song_edit">
  	<div class="modal-dialog modal-lg" role="document">
    	<div class="modal-content">
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        		<h4 class="modal-title">
        			<span v-if="is_new">Создание песенки</span>
        			<span v-else>Изменение песенки <strong>{{ org_name }}</strong></span>
					<!-- <span v-if="!is_new">Изменение исполнителя <strong>{{ singer_name }}</strong></span> -->
        		</h4>
      		</div>
      
      		<div class="modal-body">
        		<div class="row">
					<div class="col-md-5">
						<form class="form-horizontal">
					
							<div class="form-group">
								<label for="inputSinger" class="col-sm-3 control-label">Исполнитель</label>
								<div class="col-sm-9">
									<select class="form-control" v-model="item.singer">
										<option v-for="(singer, index) in singers" :key="index" :value="singer.id">{{ singer.name }}</option>
									</select>
								</div>
							</div>


							<div class="form-group">
								<label for="inputName" class="col-sm-3 control-label">Название</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="inputName" placeholder="Название" v-model="item.name">
								</div>
							</div>


							
							<div class="form-group">
								<label for="inputAuthor" class="col-sm-3 control-label">Автор</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="inputAuthor" placeholder="Автор" v-model="item.author">
								</div>
							</div>



							<div class="form-group">
								<label for="inputAlbum" class="col-sm-3 control-label">Альбом</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="inputAlbum" placeholder="Альбом" v-model="item.album">
								</div>
							</div>


							<div class="form-group">
								<label for="inputGenre" class="col-sm-3 control-label">Жанр</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="inputGenre" placeholder="Жанр" v-model="item.genre">
								</div>
							</div>


							<div class="form-group">
								<label for="inputDescription" class="col-sm-3 control-label">Описание</label>
								<div class="col-sm-9">
									<textarea class="form-control" rows="3" id="inputDescription" placeholder="Описание" v-model="item.description"></textarea>
								</div>
							</div>
							
						
						</form>

					
					</div>
					<div class="col-md-7">
						<textarea class="form-control mono" rows="25" id="inputText" placeholder="Текст" v-model="item.text"></textarea>
						
					</div>
				</div>
      		</div>
      
      		<div class="modal-footer">
        		<button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Закрыть</button>
        		<button-save @click="save()"></button-save>
      		</div>
    	</div><!-- /.modal-content -->
  	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</template>

<script>
import bus from "../bus";
import {get_default_song} from "../utils";

const MODAL_ID = "#modal_song_edit";

export default {
	data(){
		return {
			item 		: get_default_song(),
			is_new		: false,
			org_name	: ""
		}
	},

	created(){
		bus.$on("show_create_song", this.show_create);
		bus.$on("show_create_song_for_singer", this.show_create_for_singer);
		bus.$on("show_edit_song", this.show_edit);


	},


	methods: {
		show_create(){
			this.item = get_default_song();
			this.is_new = true;
			this.__open();
		},

		show_create_for_singer(singer_id){
			this.item = get_default_song();
			this.item.singer = singer_id;
			this.is_new = true;
			this.__open();
		},

		show_edit(song_id){
			this.$store.dispatch("fetch_song_simple", song_id).then(song => {
				this.item = song;
				this.is_new = false;
				this.org_name = this.item.name;
				this.__open();
			});
		},

		save(){
			
			// TODO: validation
			// let validation_result = this.__validate(this.item);
			// if(validation_result.length > 0){
			// 	this.$toastr.warning(validation_result);
			// 	return false;
			// }
			
			if(this.is_new){

				this.$store.dispatch("song_create", this.item).then(() => {
					this.$toastr.success("Песенка создана");
					this.$store.dispatch("fetch_songs");
					this.__close();
				});

			}else{

				this.$store.dispatch("song_update", this.item).then((updated_song) => {
					this.$toastr.success("Песенка обновлена");
					this.$store.dispatch("fetch_songs");
					this.$store.commit("set_song", updated_song);
					this.__close();
				});

				
			}
		},

		__open(){
			$(MODAL_ID).modal("show");
		},

		__close(){
			$(MODAL_ID).modal("hide");
		},

		__validate(data){
			if(data.name.length < 1){
				return "Название должно содержать как минимум 1 символ";
			}

			return "";
		}
	},


	computed: {
		singers(){
			return this.$store.state.singers;
		}
	}
}
</script>
