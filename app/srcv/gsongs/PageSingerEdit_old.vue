<template>
    <div v-if="is_ready">




        <h3 class="page-header">
            <span v-if="singer_current.id == 0">Создание исполнителя</span>
              			<span v-if="singer_current.id != 0">Изменение исполнителя <strong>{{ singer_current.name }}</strong></span>
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


        {{sss}}
        <hr>
        {{singer_edit}}
        <input type="text" v-model="sss.name" name="">
    </div>
</template>


<script>
    import storage from "./storage";
    import {go_back} from "./utils";
    import net from "./net";
    
    export default {
        
        
        data: function(){
            return {
                "singer_id"         : null,
                "is_new"            : false,

                // "singer_edit"       : 

                "state"             : storage.state,
                "singer"            : null,
                "singer_current"    : null,
                "is_ready"          : false
            }  
        },
        
        
        
        created: function(){
            this.singer_id = this.$route.params.id;
            this.is_new = this.singer_id == 0;



            storage.need_singers()
            
            .then(() => {
                let singer_id = this.$route.params.id;
                let singer = null;
                if(singer_id == 0){
                    singer = {
                        id: 0,
                        name: ""
                    }    
                }else{
                    singer = this.state.singers.find(item => item.id == singer_id);
                }
                this.singer_current = singer;
                this.singer = Object.assign({}, singer);
                this.is_ready = true;
            });
        },
        
        
        methods: {
            save: function(){


                console.log(this.sss);



                if(this.is_new){
                    //create
                    console.log("create");
                }else{
                    //update
                    console.log("update");
                }



                return false;

                console.log("save");
                if(this.singer.id == 0){
                    net.create_singer(this.singer).then((response)=>{
                        let singer = Object.assign({}, this.singer);
                        singer.updated = response.data.singer.updated;
                        singer.created = response.data.singer.created;
                        singer.id      = response.data.singer.id;
                        this.state.singers.push(singer);
                        this.$router.push("/singer/" + singer.id);
                    });
                }else{
                    net.update_singer(this.singer).then((response)=>{
                        Object.assign(this.singer_current, this.singer);
                        this.singer_current.updated = response.data.singer.updated;
                        go_back();
                    });
                }
            }
        },

        computed: {
            sss: function(){
                let r = this.$store.getters.find_singer(this.singer_id);
                console.log(r);
                return Object.assign({}, r);
            },


            singer_edit: function(){
                return Object.assign({}, this.singer);
            }
        }
    }
</script>
