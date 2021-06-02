<template>
    <div class="card">
        <!-- <div class="card-header">header</div> -->
        <div class="card-body">
            <div class="row">
                <div class="col-6">
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" 
                                placeholder="Поиск" v-model="search_term">
                        </div>
                    </form>
                </div>
                <div class="col-6">

                </div>
            </div>
        </div>

        <table class="table table-bordered1 table-sm">
            <thead>
                <tr>
                    <!-- <th>id</th> -->
                    <th>Песенка</th>
                    <th>Исполнитель</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(song, index) in songs" :key="index">
                    <!-- <td>{{ song.id }}</td> -->
                    <td>
                        <router-link :to="/song/ + song.id">{{ song.name }}</router-link>
                    </td>
                    <td>
                        TODO
                        <!-- <router-link :to="/singer/ + song.singer">{{ get_singer_name(song.singer) }}</router-link> -->
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <div class="card-body">
            
        </div> -->
    </div>
</template>

<script>

export default {
    props: [
        "songs",      // [model]
    ],

    data(){
        return {
            search_term     : "",
        }
    }
}
</script>
