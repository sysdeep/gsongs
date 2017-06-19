<template>
    <div v-if="song">

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
                </div>
    
                <h4 class="page-header">Другие песни исполнителя</h4>
    
                <ul>
                    <li v-for="song in singer_songs">
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
    
        <!--<modal-remove ng-if="self.is_modal_remove" on-close="self.is_modal_remove = false" on-remove="self.remove()">
            Удалить песенку
            <strong>[[ self.item.name ]]</strong>?
        </modal-remove>
    -->
    </div>
</template>



<script>
import storage from "./storage";
export default {
    data: function(){
        return {
            "state"     : storage.state,

            "song"      : null,
            "singer"    : null,
            "singer_songs"  : []
        }
    },


    created: function(){
        let song_id = this.$route.params.id;

        storage.need_songs()
            .then(storage.need_singers)
            .then(()=>{
                let song = this.state.songs.find(item => item.id == song_id);
                let singer_id = song.singer;
                let singer = this.state.singers.find(item => item.id == singer_id);

                this.singer = singer;
                this.song = song;

                this.singer_songs = this.state.songs.filter(item => item.singer == singer_id);

                console.log(this.song)
                console.log(this.singer)
            });
    },



    beforeRouteUpdate (to, from, next) {

        console.log(to);
        console.log(from);
        next();
        // react to route changes...
        // don't forget to call next()
    } 
}
</script>