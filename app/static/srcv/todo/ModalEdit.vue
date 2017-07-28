<template>
	<div class="modal fade" tabindex="-1" role="dialog" id="modal_edit">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" @click="act_cancel" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>

					<h4 class="modal-title" v-if="!item.id">Создание записи</h4>
					<h4 class="modal-title" v-if="item.id">Изменение записи</h4>
					
				</div>
				<div class="modal-body">


					<form>
					<div class="form-group">
						<label for="item_title">Заголовок</label>
						<input type="text" class="form-control" id="item_title" placeholder="title" v-model="item.title">
					</div>

					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label for="item_status">Статус</label>
								<select class="form-control" id="item_status" v-model="item.status">
									<option v-for="(status, index) in statuses" :key="index" :value="index">{{ status }}</option>
								</select>
							</div>		
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="item_priority">Важность</label>
								<select class="form-control" id="item_priority" v-model="item.priority">
									<option v-for="(num, index) in priority_array" :key="index" :value="index">{{ num }}</option>
								</select>
							</div>		
						</div>
					</div>
					

					

					<div class="form-group">
						<label for="item_description">Описание</label>
						<textarea class="form-control" id="item_description" placeholder="описание" v-model="item.description" rows="8"></textarea>
					</div>
				</form>


					

	
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" @click="act_cancel" title="отмена">
						<i class="fa fa-ban" aria-hidden="true"></i> Отмена
					</button>
					<button class="btn btn-primary" @click="act_save" title="сохранить">
						<i class="fa fa-floppy-o" aria-hidden="true"></i> Сохранить
					</button>
					
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
	props: ["item", "showed", "statuses"],

	data: function(){
		return {
			"el"				: "#modal_edit",
			"priority_array"	: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		}
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
		},


		add_interface: function(){
			this.item.interfaces.push({"name": "", "description": ""});
		},

		del_interface: function(index){
			this.item.interfaces.splice(index, 1);
		}
	}
}
</script>



<style>

</style>
