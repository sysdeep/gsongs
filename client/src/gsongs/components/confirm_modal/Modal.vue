<template>
	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
		<div class="modal-dialog modal-sm1" role="document">
			<div class="modal-content">

				<div class="modal-header">
        			<h4 class="modal-title">{{ title }}</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
      			</div>


				<div class="modal-body">
					<p>{{ text }}</p>

					<div class="row">
						<div class="col-md-6"></div>
						<div class="col-md-3">
							
						</div>
						<div class="col-md-3">
							
						</div>
					</div>
				</div>

				<div class="modal-footer">
        			<button type="button" class="btn btn-primary btn-block1" @click="act_yes">
						<i class="fa fa-check" aria-hidden="true"></i> Да
					</button>
       				<button type="button" class="btn btn-secondary btn-block1" data-dismiss="modal">
						<i class="fa fa-ban" aria-hidden="true"></i> Нет
					</button>
      			</div>
				
			</div>



		
		</div>
	</div>
</template>



<script>
/**
 * модал подтверждения действия
 */



import Vue from "vue";

export default {

	data(){
		return {
			title 		: "",
			text 		: "",



			resolve	: null,
		}
	},

	created(){


  		// Vue.prototype.$bconfirm = (text, title) => {
  		// 	this.title = title || "Подтверждение действия";
  		// 	this.text = text;
  		// 	this.open()
  		// 	return new Promise((resolve, reject) => {
  		// 		this.resolve = resolve;
  		// 	})
  		// }


	},

	methods: {

		//--- public ----------------------------------------------------------
		show(text, title){
			this.title = title || "Подтверждение действия";
  			this.text = text;
  			this.open()
  			return new Promise((resolve, reject) => {
  				this.resolve = resolve;
  			})
		},
		//--- public ----------------------------------------------------------

		act_yes(){
			this.close();
			this.resolve();
		},


		open(){
			$(this.$el).modal("show");
			// $(this.$el).find("#cmodal_active_action").focus();
		},

		close(){
			$(this.$el).modal("hide");
		}
	}
}
</script>