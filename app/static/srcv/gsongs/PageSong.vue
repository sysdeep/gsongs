<template>
    <div v-if="is_ready">

        <nav class="navbar navbar-default">
            <div class="container-fluid">
    
                <div class="navbar-header">
                    <!-- <a class="navbar-brand" href="#">
            		<img alt="Brand" src="...">
          		</a> -->
                    <span class="navbar-brand">
                        <span>{{ singer.name }}</span> -
                        <span>{{ song.name }}</span>
                    </span>
    
                </div>
    
                <!-- <ul class="nav navbar-nav">
        		<li>
        			<a href="#/singer/[[ self.item.singer ]]">
        				На страницу исполнителя
        			</a>
        		</li>
        	</ul> -->
    
                <ul class="nav navbar-nav navbar-right">
                    <!-- <li>
    	  			<a href="javascript: void(0)" ng-click="self.go_back()" title="перейти на предыдущую страницу">
    					<i class="fa fa-arrow-left" aria-hidden="true"></i> Назад
    				</a>
    			</li>
    	  		<li>
    	  			<a href="#/song_edit/[[ self.item.id ]]" title="перейти к редактированию">
    					<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Изменить
    				</a>
    			</li> -->
                    <li>
                        <router-link to="/song_edit/0" title="перейти к созданию">
                            <i class="fa fa-plus" aria-hidden="true"></i> Добавить
                        </router-link>
                    </li>
                </ul>
    
            </div>
        </nav>
    
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
                            <li ng-repeat="tag in self.free_tags">
                                <a href="javascript: void(0)" ng-click="self.add_tag(tag)">[[ tag.name ]]</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <strong>Выбранные</strong>
                        <ul>
                            <li ng-repeat="tag in self.song_tags">
                                <a href="javascript: void(0)" ng-click="self.remove_tag(tag)">[[ tag.name ]]</a>
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

            "is_modal_remove"   : false
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
                .then(()=>{
                    let song = this.state.songs.find(item => item.id == this.id);
                    let singer_id = song.singer;
                    let singer = this.state.singers.find(item => item.id == singer_id);

                    this.singer = singer;
                    this.song = song;

                    this.singer_songs = this.state.songs.filter(item => (item.singer == singer_id) && (item.id != this.id));

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
        }
    }
}
</script>