<template>
<div class="modal fade" tabindex="-1" role="dialog" id="modal_tag_edit">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">
      		<div class="modal-header">
        		<h4 class="modal-title">
        			<span v-if="is_new">Создание тэга</span>
        			<span v-else>Изменение тэга <strong>{{ org_name }}</strong></span>
        		</h4>
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      		</div>
      
      		<div class="modal-body">
        		<form>
					<div class="form-group">
						<label for="singer_name">Название</label>
						<input type="text" class="form-control" id="singer_name" placeholder="Название" v-model="item.name">
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
import {get_default_tag} from "../utils";
import { actionTypes } from "@/storage/modules/tags";

const MODAL_ID = "#modal_tag_edit";

export default {
	data(){
		return {
			item 		: get_default_tag(),
			is_new		: false,
			org_name	: ""
		}
	},

	created(){
		bus.$on("show_create_tag", this.show_create);
		bus.$on("show_edit_tag", this.show_edit);
	},


	methods: {
		show_create(){
			this.item = get_default_tag();
			this.is_new = true;
			this.__open();
		},

		show_edit(real_tag){
			this.item = Object.assign({}, real_tag);
			this.is_new = false;
			this.org_name = this.item.name;
			this.__open();
		},

		save(){
			
			let validation_result = this.__validate(this.item);
			if(validation_result.length > 0){
				this.$toastr.warning(validation_result);
				return false;
			}
			
			if(this.is_new){

				this.$store.dispatch("tag_create", this.item).then(new_tag => {
					this.$toastr.success("Тэг создан");
					this.$store.dispatch(actionTypes.GetTags);
					this.__close();
				})
				

			}else{

				this.$store.dispatch("tag_update", this.item).then(updated_tag => {
					this.$toastr.success("Тэг обновлён");
					this.$store.dispatch(actionTypes.GetTags);
					this.__close();
				})

				
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
