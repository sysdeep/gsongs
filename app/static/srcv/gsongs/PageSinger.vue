<template>
    <div v-if="is_ready">
    
        <div class="page-header">
            <h3>Исполнитель - {{ singer.name }}</h3>
        </div>
    
        <div class="row">
            <div class="col-md-6">
    
                <dl class="dl-horizontal">
                    <dt>Название</dt>
                    <dd>{{ singer.name }}</dd>
    
                    <dt>Создание</dt>
                    <dd>{{ singer.created }}</dd>
    
                    <dt>Обновление</dt>
                    <dd>{{ singer.updated }}</dd>
                </dl>
    
                <button-back></button-back>
    
                <div class="pull-right">
                    <button-remove @click="show_remove" :disabled="singer_songs.length > 0"></button-remove>
                    <router-link class="btn btn-primary" :to="/singer_edit/ + singer.id"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</router-link>
                </div>
    
            </div>
            <div class="col-md-6">
    
                <div class="row">
                    <div class="col-md-6">
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Быстрый поиск названию" v-model="filter_songs">
                            </div>
                        </form>
    
                    </div>
                    <div class="col-md-6">
                        <div class="pull-right">
                            <!--<lbutton-create href="#/song_edit/0"></lbutton-create>-->
                            
                        </div>
                    </div>
                </div>
    
                <table class="table table-bordered table-condensed">
                    <thead>
                        <tr>
                            <th>
                                <a href="javascript: void(0)" @click="act_sort('name')">Название</a>
                            </th>
                            <!-- <th>Автор</th>
    					<th>Альбом</th>
    					<th>Описание</th>
    					<th>Жанр</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(song, index) in filtered_songs" :key="index">
                            <td>
                                <router-link :to="/song/ + song.id" title="перейти к странице песни">{{ song.name }}</router-link>
                            </td>
                            <!-- <td>[[ song.author ]]</td>
    					<td>[[ song.album ]]</td>
    					<td>[[ song.description ]]</td>
    					<td>[[ song.genre ]]</td> -->
                        </tr>
                    </tbody>
                </table>
    
                <!-- <div class="pull-right">
    			<lbutton-create href="#/song_edit/0"></lbutton-create>
    		</div> -->
    
            </div>
        </div>
<!--    
        <modal-remove ng-if="self.is_modal_remove" on-close="self.is_modal_remove = false" on-remove="self.remove()">
            Удалить исполнителя?
        </modal-remove>-->
    
    
        <modal-remove :showed="is_modal_remove" @on-cancel="is_modal_remove = false" @on-apply="remove_singer" @closed="remove_modal_closed">
            <p>Удалить исполнителя: {{ singer.name }} ?</p>
        </modal-remove>
    </div>
</template>








<script>
import storage from "./storage";
import net from "./net";
import {go_back} from "./utils";

export default {
    data: function () {
        return {
            "state": storage.state,

            "singer_songs": [],
            "singer": {
                "name": "---",
                "created": "---",
                "updated": "---"
            },

            "filter_songs": "",


            "is_modal_remove"   : false,
            "is_removed"        : false,
            "is_ready"          : false
        }
    },


    created: function () {
        storage.need_singers()
            .then(storage.need_songs)
            .then(() => {
                let singer_id = this.$route.params.id;
                this.singer = this.state.singers.find(item => item.id == singer_id);

                //--- singer songs
                this.singer_songs = this.state.songs.filter(song => song.singer == singer_id);

                this.is_ready = true;
            });
    },


    computed: {
        filtered_songs: function(){
            let lfind = this.filter_songs.toLowerCase();
            return this.singer_songs.filter(item => {
                let name = item.name.toLowerCase();
                return name.indexOf(lfind) > -1;
            })
        }
    },

    methods: {
        act_sort: function(field){
            console.log("need implement act_sort!!!")
        },

        show_remove: function(){
            this.is_modal_remove = true;
        },

        remove_singer: function(){
            net.remove_singer(this.singer).then((response)=>{
                let index = this.state.singers.indexOf(this.singer);
                this.state.singers.splice(index, 1);
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