<template>
    <div v-if="is_ready">
        <nav class="navbar navbar-default">
  	        <div class="container-fluid">
    	
            	<div class="navbar-header">
              		<span class="navbar-brand">
              			<span v-if="singer_current.id == 0">Создание исполнителя</span>
              			<span v-if="singer_current.id != 0">Изменение исполнителя <strong>{{ singer_current.name }}</strong></span>
              			
              		</span>
            	</div>
        
        
        		<!-- 
            	<ul class="nav navbar-nav">
            		<li>
            			<a href="#/singer/[[ data.song_current.singer ]]">
            				На страницу исполнителя
            			</a>
            		</li> 
            	</ul>
            	-->
        
        
        
            	<!-- <ul class="nav navbar-nav navbar-right">
        	  		<li>
        	  			<a href="javascript: void(0)" ng-click="show_edit()" title="изменить данные исполнителя">
        					<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Изменить
        				</a>
        			</li>
        			<li>
        				<a href="#/song_edit/0" title="перейти к созданию">
        					<i class="fa fa-plus" aria-hidden="true"></i> Добавить песню
        				</a>
        			</li>
          		</ul> -->
        
          	</div>
        </nav>




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
    import storage from "./storage";
    
    export default {
        
        
        data: function(){
            return {
                "state"             : storage.state,
                "singer"            : null,
                "singer_current"    : null,
                "is_ready"          : false
            }  
        },
        
        
        
        created: function(){
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
                if(this.singer.id == 0){
                    // create
                }else{
                    //update
                }
            }
        }
    }
</script>
