<template>
    <div>



        <!-- <span class="pull-right">
            <div class="row">
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Быстрый поиск названию" v-model="search_name"></div>
                <div class="col-md-6">

                    <div class="btn-group" role="group" aria-label="...">
  <button type="button" class="btn btn-default">Left</button>
  <button type="button" class="btn btn-default">Middle</button>
  <button type="button" class="btn btn-default">Right</button>
</div>
                </div>
            </div>
            
        </span> -->

        <!-- <h3 class="page-header">Список исполнителей</h3> -->
    
        <nav class="navbar navbar-default">
            <div class="container-fluid">
    
                <div class="navbar-header">
                    <!-- <a class="navbar-brand" href="#">
        					<img alt="Brand" src="...">
        				</a> -->
                    <span class="navbar-brand">
                        Список исполнителей
                    </span>
    
                </div>
    
                <form class="navbar-form navbar-left" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Быстрый поиск названию" v-model="search_name">
                    </div>
                </form>
    
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="javascript: void(0)" @click="refresh" title="обновить список">
                            <i class="fa fa-refresh" aria-hidden="true"></i> Обновить
                        </a>
                    </li>
                    <li>
                        <!-- <a href="javascript: void(0)" ng-click="show_add_singer()" title="отобразить диалог добавления">
        						<i class="fa fa-plus" aria-hidden="true"></i> Добавить
        					</a> -->
    
                        <a href="#/singer_edit/0" title="отобразить диалог добавления">
                            <i class="fa fa-plus" aria-hidden="true"></i> Добавить
                        </a>
                    </li>
                </ul>
    
            </div>
        </nav>
    
        <!--<chars select="self.select_char(char_value)"></chars>-->
    
        <br>
    
        <table class="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th>id</th>
                    <th>
                        <a href="javascript: void(0)" ng-click="self.sort('name')">Исполнитель</a>
                    </th>
                    <th>
                        <a href="javascript: void(0)" ng-click="self.sort('created')">Создание</a>
                    </th>
                    <th>
                        <a href="javascript: void(0)" ng-click="self.sort('updated')">Обновление</a>
                    </th>
                    <th>Опции</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="singer in singers_filtered">
                    <td>{{ singer.id }}</td>
                    <td>
                        <router-link :to="/singer/ + singer.id" title="перейти на страницу исполнителя">
                            {{ singer.name }}
                        </router-link>
                    </td>
                    <!--<td>{{ singer.created | date:'yyyy-MM-dd' }}</td>-->
                    <td>{{ singer.created }}</td>
                    <td>{{ singer.updated }}</td>
                    <td>
                        
                        <router-link :to="/singer_edit/ + singer.id" title="изменить запись">
                            <i class="fa fa-pencil"></i> изменить
                        </router-link>
                        <!-- |
        					<a href="javascript: void(0)" ng-click="show_remove_singer(singer)" title="отобразить запрос удаления">
        						<i class="fa fa-trash-o"></i> удалить
        					</a> -->
                    </td>
                </tr>
            </tbody>
        </table>
    
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
        storage.need_singers();
        // if(this.state.singers_loaded == false){
        //     storage.fetch_singers();
        // }
    },


    computed: {
        singers_filtered: function(){
            var s_name = this.search_name.toLowerCase();
            let result = this.state.singers.filter((item)=>{
                let index = item.name.toLowerCase().indexOf(s_name);
                return index > -1;
            });
            return result;
        }
    },

    methods: {
        refresh: function(){
            storage.fetch_singers();
        }
    }



}
</script>