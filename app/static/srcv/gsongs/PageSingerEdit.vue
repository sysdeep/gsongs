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
        				<input type="text" class="form-control" id="singer_name" placeholder="Название" v-model="singer.name">
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
            }  
        },
        
        
        
        created: function(){
            this.singer_id = this.$route.params.id;
            this.is_new = this.singer_id == 0;


        },
        
        
        methods: {
            save: function(){


                // console.log(this.singer);



                if(this.is_new){
                    //create
                    // console.log("create");
                    this.$store.dispatch("singer_create", {"singer": this.singer}).then((new_singer_id) => {
                        this.$router.push("/singer/" + new_singer_id);
                    });
                }else{
                    //update
                    // console.log("update");
                    this.$store.dispatch("singer_update", {"singer": this.singer}).then(() => {
                        go_back();
                    });
                    // console.log("after update");
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
            singer: function(){
                let r = this.$store.getters.find_singer(this.singer_id);
                if(r){
                    return Object.assign({}, r);    
                }

                let new_row = {
                    "id"        : 0,
                    "name"      : ""
                }

                return new_row;
                // return r;
            },


            // singer_edit: function(){
            //     return Object.assign({}, this.singer);
            // }
        }
    }
</script>
