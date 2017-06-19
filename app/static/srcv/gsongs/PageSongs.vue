<template>
    <div>
        <h1 class="page-header">
            Все песенки
            <small>{{ state.songs.length }}</small>
        </h1>
    
        <div class="row">
            <div class="col-md-6">
                <input type="text" class="form-control" v-model="search_name" placeholder="быстрый поиск">
            </div>
            <div class="col-md-6">
                <div class="pull-right">
                    <button class="btn btn-primary" @click="refresh" title="загрузить список">
                        <i class="fa fa-refresh" aria-hidden="true"></i> Обновить
                    </button>
                    <!--<lbutton-create href="#/song_edit/0"></lbutton-create>-->
                </div>
            </div>
        </div>
    
        <br>
    
        <table class="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th>
                        <a href="javascript: void(0)" ng-click="self.sort('id')">id</a>
                    </th>
                    <th>
                        <a href="javascript: void(0)" ng-click="self.sort('singer')">Исполнитель</a>
                    </th>
                    <!-- <th>Автор</th> -->
                    <th>
                        <a href="javascript: void(0)" ng-click="self.sort('name')">Название</a>
                    </th>
                    <!-- <th>Альбом</th> -->
                    <!-- <th>Текст</th> -->
                    <!-- <th>Описание</th> -->
                    <!-- <th>Жанр</th> -->
                    <!-- <th>Метки</th> -->
                    <!-- <th>Создание</th> -->
                    <!-- <th>Обновление</th> -->
                    <!-- <th>api</th> -->
                    <th>options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="song in songs_filtered">
                    <td>{{ song.id }}</td>
                    <td>
                        <router-link :to="/singer/ + song.singer">
                            <!-- <a href="javascript: void(0)" title="" ng-click="select_singer(song.singer)"> -->
                            <!--{{ self.find_singer_name(song.singer) }}-->
                        </router-link>
                    </td>
                    <!-- <td>{{ song.author }}</td> -->
                    <td>
                        <router-link :to="/song/ + song.id" title="">{{ song.name }}</router-link>
                        <!-- <a href="javascript: void(0)" title="" ng-click="show_song(song)">{{ song.name }}</a> -->
                    </td>
                    <!-- <td>{{ song.album }}</td> -->
                    <!-- <td>{{ song.text }}</td> -->
                    <!-- <td>{{ song.description }}</td>
    			<td>{{ song.genre }}</td> -->
                    <!-- <td>{{ song.tags }}</td> -->
                    <!-- <td>{{ song.created }}</td> -->
                    <!-- <td>{{ song.updated }}</td> -->
                    <!-- <td>{{ song.api }}</td> -->
                    <td>
                        <!--<a href="#/song/{{ song.id }}" title="">&nbsp
                            <i class="fa fa-folder-open-o"></i>&nbsp</a>
                        |
                        <a href="#/song_edit/{{ song.id }}" title="">&nbsp
                            <i class="fa fa-pencil"></i>&nbsp</a>-->
                        <!-- |
    				<a href="javascript: void(0)" title="" ng-click="show_remove(song)">&nbsp<i class="fa fa-trash-o"></i>&nbsp</a> -->
    
                    </td>
                </tr>
            </tbody>
        </table>
    
        <!-- 
    <script type="text/ng-template" id="remove_modal_template">
    	<h4>Подтверждение удаления песенки</h4>
    
    	<div class="alert alert-danger" role="alert">
    		<p>Вы собираетесь удалить песенку: <strong>{{ data.song_edit.name }}</strong></p>
    	</div>
    
    	<hr>
    	<div class="row">
    		<div class="col-md-6">
    			<button class="btn btn-default btn-block" ng-click="closeThisDialog()"><i class="fa fa-ban" aria-hidden="true"></i> Отмена</button>
    		</div>
    		<div class="col-md-6">
    			<button class="btn btn-danger btn-block" ng-click="remove_song()"><i class="fa fa-trash-o" aria-hidden="true"></i> Удалить</button>
    		</div>
    	</div>
    
    </script> -->
    </div>
</template>


<script>
import storage from "./storage";
export default {
    data: () => {
        return {
            "state": storage.state,

            "search_name": ""
        }
    },


    created: function(){
        storage.need_songs();
        // if(this.state.songs_loaded == false){
        //     storage.fetch_songs();
        // }
    },


    computed: {
        songs_filtered: function(){
            var s_name = this.search_name.toLowerCase();
            let result = this.state.songs.filter((item)=>{
                let index = item.name.toLowerCase().indexOf(s_name);
                return index > -1;
            });
            return result;
        }
    },

    methods: {
        refresh: function(){
            storage.fetch_songs();
        }
    }



}
</script>