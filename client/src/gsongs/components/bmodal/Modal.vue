<template>
	<div class="modal" :class="modal_animation" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
		<div class="modal-dialog" :class="modal_size_class">
			<div class="modal-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},
		size: String,
		animation: String,
	},



	watch: {
		value(v){
			if(v){
				this.open();
			}else{
				this.close();
			}
		}
	},
	
	mounted(){
		$(this.$el).on("hidden.bs.modal", () => {
			if(this.value == true){
				this.$emit("input", false);
			}
		})
	},

	methods: {
		open(){
			$(this.$el).modal("show");
		},

		close(){
			$(this.$el).modal("hide");
		}
	},


	computed: {
		modal_size_class(){
			return this.size? "modal-" + this.size : "";
		},

		modal_animation(){
			return this.animation? this.animation : "";
		}
	}
}
</script>