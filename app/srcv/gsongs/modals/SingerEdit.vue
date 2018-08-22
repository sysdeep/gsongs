<template>
<div class="modal fade" tabindex="-1" role="dialog" id="modal_singer_edit">
  	<div class="modal-dialog" role="document">
    	<div class="modal-content">
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        		<h4 class="modal-title">
        			<span v-if="is_new">Создание исполнителя</span>
        			<span v-else>Изменение исполнителя</span>
					<!-- <span v-if="!is_new">Изменение исполнителя <strong>{{ singer_name }}</strong></span> -->
        		</h4>
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
        		<button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
        		<button-save @click="save()"></button-save>
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
			item 	: get_default_singer(),
			is_new	: false,
		}
	},

	created(){
		bus.$on("show_create_singer", this.show_create);
	},


	methods: {
		show_create(){
			console.log("show_create");
			this.item = get_default_singer();
			this.is_new = true;
			this.__open();
		},

		save(){
			// console.log(this.item);
			// this.__close();
			
			if(this.is_new){

				this.$store.dispatch("singer_create", this.item).then((new_singer_id) => {
					// this.$router.push("/singer/" + new_singer_id);
					this.__close();
				});

			}else{

				// this.$store.dispatch("singer_update", this.singer_edit).then((new_singer_id) => {
				// 	go_back();
				// });

				
			}
		},

		__open(){
			$(MODAL_ID).modal("show");
		},

		__close(){
			$(MODAL_ID).modal("hide");
		},
	}
}
</script>
