<template>
<div class="modal fade" tabindex="-1" role="dialog" id="modal_singer_edit">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">
      		<div class="modal-header">
        		<h4 class="modal-title">
        			<span v-if="is_new">Создание исполнителя</span>
        			<span v-else>Изменение исполнителя <strong>{{ org_name }}</strong></span>
					<!-- <span v-if="!is_new">Изменение исполнителя <strong>{{ singer_name }}</strong></span> -->
        		</h4>
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      		</div>
      
      		<div class="modal-body">
        		<form>
					<div class="form-group">
						<label for="singer_name_main">Название</label>
						<input type="text" class="form-control" id="singer_name_main" placeholder="Название" v-model="item.name">
					</div>
				</form>
      		</div>
      
      		<div class="modal-footer">
        		<button-save @click="save()"></button-save>
        		<button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i> Закрыть</button>
      		</div>
    	</div><!-- /.modal-content -->
  	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</template>

<script>
import bus from "../bus";
import {get_default_singer} from "../utils";

const MODAL_ID = "#modal_singer_edit";

export default {
	data(){
		return {
			item 		: get_default_singer(),
			is_new		: false,
			org_name	: ""
		}
	},

	created(){
		bus.$on("show_create_singer", this.show_create);
		bus.$on("show_edit_singer", this.show_edit);
	},


	methods: {
		show_create(){
			this.item = get_default_singer();
			this.is_new = true;
			this.__open();
		},

		show_edit(singer_id){
			this.$store.dispatch("fetch_singer_simple", singer_id).then(singer => {
				this.item = singer;
				this.is_new = false;
				this.org_name = this.item.name;
				this.__open();
			});
		},

		save(){
			
			let validation_result = this.__validate(this.item);
			if(validation_result.length > 0){
				this.$toastr.warning(validation_result);
				return false;
			}
			
			if(this.is_new){

				this.$store.dispatch("singer_create", this.item).then(() => {
					this.$toastr.success("Исполнитель создан");
					this.$store.dispatch("fetch_singers");
					this.__close();
				});

			}else{

				this.$store.dispatch("singer_update", this.item).then((updated_singer) => {
					this.$toastr.success("Исполнитель обновлён");
					this.$store.dispatch("fetch_singers");
					this.$store.commit("set_singer", updated_singer);
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
	}
}
</script>
