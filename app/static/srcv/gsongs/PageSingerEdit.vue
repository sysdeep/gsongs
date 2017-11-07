<template>
	<div v-if="singer">




		<h3 class="page-header">
			<span v-if="is_new">Создание исполнителя</span>
			<span v-if="!is_new">Изменение исполнителя <strong>{{ singer.name }}</strong></span>
		</h3>

		<!-- <nav class="navbar navbar-default">
			<div class="container-fluid">
		
				<div class="navbar-header">
					<span class="navbar-brand">
						<span v-if="singer_current.id == 0">Создание исполнителя</span>
						<span v-if="singer_current.id != 0">Изменение исполнителя <strong>{{ singer_current.name }}</strong></span>
						
					</span>
				</div>
		
		
			</div>
		</nav> -->




		<div class="row">
			<div class="col-md-6">
				<form>
					<div class="form-group">
						<label for="singer_name">Название</label>
						<!-- <input type="text" class="form-control" id="singer_name" placeholder="Название" @input="in_name" :value="singer.name"> -->
						<input type="text" class="form-control" id="singer_name" placeholder="Название" v-model="singer_edit.name">
						<!-- <input type="text" class="form-control" id="singer_name" placeholder="Название" v-model="singer.name"> -->
						<!-- <input type="text" class="form-control" id="singer_name" placeholder="Название" v-model="singer_name"> -->
					</div>
				</form>
		
				<hr>
		
				<button-back></button-back>
				<div class="pull-right">
					<button-save @click="save()"></button-save>
				</div>
				
			</div>
			<div class="col-md-6">
		<pre>
{{ singer }}
{{ singer_edit }}
		</pre>
			</div>
		</div>


		
	</div>
</template>


<script>

	import {go_back} from "./utils";
	import net from "./net";
	
	export default {
		
		
		data: function(){
			return {
				"singer_id"         : null,
				"is_new"            : false,


				"singer_edit"       : {
					"name"          : "",
					"id"			: 0
				}
			}  
		},
		
		
		
		created: function(){
			this.singer_id 	= this.$route.params.id;
			this.is_new 	= this.singer_id == 0;

			// this.$store.dispatch("set_current_singer", this.singer_id);

		},
		
		
		methods: {
			// in_name: function(e){
			// 	console.log(e);
			// 	this.singer_edit.name = e.target.value;
			// },

			save: function(){

				// this.singer_edit.id = this.singer.id;
				// return console.log(this.singer_edit);

				// console.log(this.singer);



				if(this.is_new){
					//create
					// console.log("create");
					
					// this.$store.dispatch("singer_create", {"singer": this.singer_edit}).then((new_singer_id) => {
					// 	this.$router.push("/singer/" + new_singer_id);
					// });

					net.create_singer(this.singer_edit).then(response => {
						this.$store.dispatch("fetch_singers");
						let singer_id = response.data.singer.id;
						this.$router.push("/singer/" + singer_id);
					})
				}else{
					//update
					// console.log("update");
					// this.$store.dispatch("singer_update", {"singer": this.singer_edit}).then(() => {
					// 	go_back();
					// });
					// console.log("after update");
					net.update_singer(this.singer_edit).then(response => {
						// console.log("update ok");
						// let singer
						this.$store.dispatch("fetch_singers");

						// resolve();
						go_back();
					})
				}



				return false;

				// console.log("save");
				// if(this.singer.id == 0){
				//     net.create_singer(this.singer).then((response)=>{
				//         let singer = Object.assign({}, this.singer);
				//         singer.updated = response.data.singer.updated;
				//         singer.created = response.data.singer.created;
				//         singer.id      = response.data.singer.id;
				//         this.state.singers.push(singer);
				//         this.$router.push("/singer/" + singer.id);
				//     });
				// }else{
				//     net.update_singer(this.singer).then((response)=>{
				//         Object.assign(this.singer_current, this.singer);
				//         this.singer_current.updated = response.data.singer.updated;
				//         go_back();
				//     });
				// }
			}
		},

		computed: {

			/**
			 * !!! - пока только так....
			 * @return {[type]} [description]
			 */
			singer: function(){
				let r = this.$store.getters.find_singer(this.singer_id);
				if(r){
					this.singer_edit = Object.assign({}, r);
				}

				// return r;
				return this.singer_edit;
			},



			// singer_name: {
			//     get: function(){
			//         return this.singer.name;
			//     },
			//     set: function(value){
			//         console.log(value);
			//         this.singer_edit.name = value;
			//     }
			// }


			// singer_edit: function(){
			//     return Object.assign({}, this.singer);
			// }
		}
	}
</script>
