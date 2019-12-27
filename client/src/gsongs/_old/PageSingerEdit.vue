<template>
	<div>




		<h3 class="page-header">
			<span v-if="is_new">Создание исполнителя</span>
			<span v-if="!is_new">Изменение исполнителя <strong>{{ singer_name }}</strong></span>
		</h3>



		<div class="row">
			<div class="col-md-6">
				<form v-if="singer_edit">
					<div class="form-group">
						<label for="singer_name">Название</label>
						<input type="text" class="form-control" id="singer_name" placeholder="Название" v-model="singer_edit.name">
					</div>
				</form>
		
				<hr>
		
				<BtnBack />
				<div class="pull-right">
					<button-save @click="save()"></button-save>
				</div>
				
			</div>
			<div class="col-md-6">
		
			</div>
		</div>


		
	</div>
</template>


<script>


	import {go_back} from "./utils";
	import net from "./net";
	import {get_default_singer} from "./utils";
	
	export default {
		
		
		data: function(){
			return {
				"singer_id"         : null,
				"is_new"            : false,
			}  
		},
		
		
		
		created: function(){
			this.singer_id 	= this.$route.params.id;
			this.is_new 	= this.singer_id == 0;
		},
		
		
		methods: {
			
			save: function(){


				if(this.is_new){

					this.$store.dispatch("singer_create", this.singer_edit).then((new_singer_id) => {
						this.$router.push("/singer/" + new_singer_id);
					});

				}else{

					this.$store.dispatch("singer_update", this.singer_edit).then((new_singer_id) => {
						go_back();
					});

					
				}

			}
		},


		computed: {

			
			singer_name: function(){
				let r = this.$store.getters.find_singer(this.singer_id);
				return r? r.name : "---";
			},



			singer_edit: function(){
				if(this.is_new){
					return get_default_singer();
				}else{
					let r = this.$store.getters.find_singer(this.singer_id);
			    	return Object.assign({}, r);
				}
			}
		}
	}
</script>
