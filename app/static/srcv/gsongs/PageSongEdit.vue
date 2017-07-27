<template>
    <div v-if="is_ready">


        <h3 class="page-header">
            <span v-if="song_current.id == 0">Создание записи</span>
            <span v-if="song_current.id != 0">Изменение записи <strong>{{ song_current.name }}</strong></span>
        </h3>

        <!-- <nav class="navbar navbar-default">
  	        <div class="container-fluid">
    	
            	<div class="navbar-header">
              		<span class="navbar-brand">
              			<span v-if="song_current.id == 0">Создание записи</span>
              			<span v-if="song_current.id != 0">Изменение записи <strong>{{ song_current.name }}</strong></span>
              			
              		</span>
            	</div>
        
        
        
          	</div>
        </nav> -->



        <div class="row">
            <div class="col-md-5">
                <form class="form-horizontal">
            
                    <div class="form-group">
                        <label for="inputSinger" class="col-sm-3 control-label">Исполнитель</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="song.singer">
                                <option v-for="(singer, index) in state.singers" :key="index" :value="singer.id">{{ singer.name }}</option>
                            </select>
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="inputName" class="col-sm-3 control-label">Название</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="inputName" placeholder="Название" v-model="song.name">
                        </div>
                    </div>


                    
                    <div class="form-group">
                        <label for="inputAuthor" class="col-sm-3 control-label">Автор</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="inputAuthor" placeholder="Автор" v-model="song.author">
                        </div>
                    </div>



                    <div class="form-group">
                        <label for="inputAlbum" class="col-sm-3 control-label">Альбом</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="inputAlbum" placeholder="Альбом" v-model="song.album">
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="inputGenre" class="col-sm-3 control-label">Жанр</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="inputGenre" placeholder="Жанр" v-model="song.genre">
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="inputDescription" class="col-sm-3 control-label">Описание</label>
                        <div class="col-sm-9">
                            <textarea class="form-control" rows="3" id="inputDescription" placeholder="Описание" v-model="song.description"></textarea>
                        </div>
                    </div>


                    
                    

                    <hr>
                
                </form>


                <button-back></button-back>
                <div class="pull-right">
                    <button-save @click="save"></button-save>
                </div>
            </div>
            <div class="col-md-7">
                <form class="form-horizontal">
            
                    <div class="form-group">
                        <textarea class="form-control mono" rows="25" id="inputText" placeholder="Текст" v-model="song.text"></textarea>
                    </div>

                </form>
            </div>
        </div>


        
    </div>
</template>


<script>
    import storage from "./storage";
    import {go_back, get_default_song} from "./utils";
    import net from "./net";
    
    export default {
        
        
        data: function(){
            return {
                "state"             : storage.state,
                "song"            : null,
                "song_current"    : null,
                "is_ready"          : false
            }  
        },
        
        
        
        created: function(){
            storage.need_songs()
                .then(storage.need_singers)
                .then(() => {
                    let song_id = this.$route.params.id;
                    let song = null;
                    if(song_id == 0){
                        song = get_default_song();
                    }else{
                        song = this.state.songs.find(item => item.id == song_id);
                    }
                    this.song_current = song;
                    this.song = Object.assign({}, song);


                    //--- если есть переменная - пришли со страницы исполнителя, скорее всего хотим добавить ему песенку - сразу выставляем)
                    if(this.state.current_singer_id){
                        this.song.singer = this.state.current_singer_id;
                    }

                    this.is_ready = true;
                });
        },
        
        
        methods: {
            save: function(){
                if(this.song.id == 0){
                    net.create_song(this.song).then((response)=>{
                        let song = Object.assign({}, this.song);
                        song.updated = response.data.result.updated;
                        song.created = response.data.result.created;
                        song.id      = response.data.result.id;
                        this.state.songs.push(song);
                        this.$router.push("/song/" + song.id);
                    });
                }else{
                    net.update_song(this.song).then((response)=>{
                        Object.assign(this.song_current, this.song);
                        this.song_current.updated = response.data.result.updated;
                        go_back();
                    });
                }
            }
        }
    }
</script>
