<template>
    <div v-if="is_ready">



        <h3 class="page-header">
            <span>{{ singer.name }}</span> -
                        <span>{{ song.name }}</span>
        </h3>

        <!-- <nav class="navbar navbar-default">
            <div class="container-fluid">
    
                <div class="navbar-header">
                    <span class="navbar-brand">
                        <span>{{ singer.name }}</span> -
                        <span>{{ song.name }}</span>
                    </span>
    
                </div>
    
    
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <router-link to="/song_edit/0" title="перейти к созданию">
                            <i class="fa fa-plus" aria-hidden="true"></i> Добавить
                        </router-link>
                    </li>
                </ul>
    
            </div>
        </nav> -->
    
        <div class="row">
            <div class="col-md-5">
    
                <table class="table table-bordered table-condensed">
                    <tbody>
                        <tr>
                            <td>Исполнитель</td>
                            <td>
                                <lsinger :cdata="singer"></lsinger>
                            </td>
                        </tr>
    
                        <tr>
                            <td>Автор</td>
                            <td>{{ song.author }}</td>
                        </tr>
    
                        <tr>
                            <td>Название</td>
                            <td>{{ song.name }}</td>
                        </tr>
    
                        <tr>
                            <td>Альбом</td>
                            <td>{{ song.album }}</td>
                        </tr>
    
                        <tr>
                            <td>Описание</td>
                            <td>{{ song.description }}</td>
                        </tr>
    
                        <tr>
                            <td>Жанр</td>
                            <td>{{ song.genre }}</td>
                        </tr>
    
                        <tr>
                            <td>Создание</td>
                            <td>{{ song.created }}</td>
                        </tr>
    
                        <tr>
                            <td>Обновление</td>
                            <td>{{ song.updated }}</td>
                        </tr>
    
                    </tbody>
                </table>
    
                <button-back></button-back>
    
                <div class="pull-right">
                    <!--<button-remove ng-click="self.show_remove()"></button-remove>
                    <lbutton-edit href="#/song_edit/[[ self.item.id ]]"></lbutton-edit>-->

                    <button class="btn btn-success" @click="add_song" title="добавить запись">
                        <i class="fa fa-plus" aria-hidden="true"></i> Добавить
                    </button>

                    <button-remove @click="show_remove"></button-remove>
                    <router-link class="btn btn-primary" :to="/song_edit/ + song.id"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</router-link>
                </div>
    
                <h4 class="page-header">Другие песни исполнителя</h4>
    
                <ul>
                    <li v-for="(song, index) in singer_songs" :key="index">
                        <lsong :cdata="song"></lsong>
                    </li>
                </ul>
    
                <h4 class="page-header">Tags</h4>
    
                <div class="row">
                    <div class="col-md-6">
                        <strong>Доступные</strong>
                        <ul>
                            <li v-for="(tag, index) in free_tags" :key="index">
                                <a href="javascript: void(0)" @click="add_tag(tag)">{{ tag.name }}</a>
                            </li> 
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <strong>Выбранные</strong>
                        <ul>
                            <li v-for="(tag, index) in song_tags" :key="index">
                                <router-link :to="/tag/ + tag.id">go</router-link>
                                <a href="javascript: void(0)" @click="remove_tag(tag)">{{ tag.name }}</a>
                            </li>
                        </ul>
    
                    </div>
                </div>
    
            </div>
            <div class="col-md-7">
    
                <pre>
    {{ song.text }}
    </pre>
    
            </div>
        </div>
    
      


        <modal-remove :showed="is_modal_remove" @on-cancel="is_modal_remove = false" @on-apply="remove_song" @closed="remove_modal_closed">
            <p>Удалить песенку: {{ song.name }} ?</p>
        </modal-remove>
    </div>
</template>



<script>
import storage from "./storage";
import net from "./net";
import {go_back} from "./utils";



export default {
    data: function(){
        return {
            "state"     : storage.state,
            "id"        : null,
            "is_ready"  : false,

            "song"      : null,
            "singer"    : null,
            "singer_songs"  : [],

            "is_modal_remove"   : false,


            "free_tags"     : [],
            "song_tags"     : []
        }
    },


    created: function(){
        this.refresh();
    },



    
    watch: {
        "$route": function(to, from){
            this.refresh();
        }
    },

    methods: {
        refresh: function(){
            this.id = this.$route.params.id;
            console.log("refresh");

            storage.need_songs()
                .then(storage.need_singers)
                .then(storage.need_tags)
                .then(()=>{
                    let song = this.state.songs.find(item => item.id == this.id);
                    let singer_id = song.singer;
                    let singer = this.state.singers.find(item => item.id == singer_id);

                    this.singer = singer;
                    this.song = song;

                    this.singer_songs = this.state.songs.filter(item => (item.singer == singer_id) && (item.id != this.id));


                    
                    this.reload_tags();

                    this.is_ready = true;
                });
        },




        show_remove: function(){
            this.is_modal_remove = true;
        },

        remove_song: function(){
            net.remove_song(this.song).then((response)=>{
                let index = this.state.songs.indexOf(this.song);
                this.state.songs.splice(index, 1);
                this.is_removed = true;
                this.is_modal_remove = false;
            })
        },

        remove_modal_closed: function(){
            if(this.is_removed){
                go_back();
            }
        },




        add_song: function(){
            this.state.current_singer_id = this.singer.id;
            this.$router.push("/song_edit/0");
        },


        reload_tags: function(){
            this.song_tags = [];
			this.free_tags = [];
            var tmp_tags = Object.assign([], this.state.tags);
            

            net.get_song_tags(this.id).then(response => {
                var song_tags_ids = response.data.result;

				song_tags_ids.forEach(id => {
					let tag = tmp_tags.find(tag => tag.id == id);
					if(tag){
						this.song_tags.push(tag);
						var i = tmp_tags.indexOf(tag);
						tmp_tags.splice(i, 1);
					}
				})

				this.free_tags = tmp_tags;
            })
			
        },




        add_tag: function(tag){
            net.add_song_tag(this.song.id, tag.id).then(response => {
				this.reload_tags();
			});
        },


        remove_tag: function(tag){
            net.remove_song_tag(this.song.id, tag.id).then(response => {
				this.reload_tags();
			});
        }



    }
}
</script>