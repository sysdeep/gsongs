<template>
	<div class="modal fade" tabindex="-1" role="dialog" id="modal_remove">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" @click="act_cancel" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Подтверждение удаления</h4>
				</div>
				<div class="modal-body">


					<slot></slot>


	
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" @click="act_cancel" title="отмена">
						<i class="fa fa-ban" aria-hidden="true"></i> Отмена
					</button>
					<button class="btn btn-danger" @click="act_save" title="удалить">
						<i class="fa fa-trash" aria-hidden="true"></i> Удалить
					</button>
					<!--<button type="button" class="btn btn-default" @click="act_cancel">Close</button>
					<button type="button" class="btn btn-primary" @click="act_save">Save changes</button>-->
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
</template>




<script>
export default {
	props: ["showed"],

	data: function(){
		return {
			"el"	: "#modal_remove",
		}
    },
    
    mounted: function(){
        $(this.el).on("hidden.bs.modal", (e)=>{
            this.$emit("closed");
        })
    },


	watch: {
		showed: function(to, from){

			if(to){
				$(this.el).modal({
					"backdrop": false,
					"show"	: true
				})
			}else{
				$(this.el).modal("hide");
			}
		}
	},

	methods: {
		act_cancel: function () {
			this.$emit("on-cancel");
		},

		act_save: function(){
			this.$emit("on-apply", this.item)
		}
	
	}
}
</script>



<style>

</style>
