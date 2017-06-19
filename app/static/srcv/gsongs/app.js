import Vue from "vue";
import VueRouter from 'vue-router'


// import component_menu from "./menu/menu";
// import page_main from "./page_main/page_main";
// import page_singers from "./page_singers/page_singers";
import component_menu from "./Menu.vue";
import page_main from "./PageMain.vue";
import page_singers from "./PageSingers.vue";
import page_singer from "./PageSinger.vue";
import page_songs from "./PageSongs.vue";
import page_song from "./PageSong.vue";

import component_button_back from "./components/ButtonBack.vue";
import component_lsinger from "./components/LSinger.vue";
import component_lsong from "./components/LSong.vue";


const page_create_song = {template: "<p>page_create_song</p>"};
// const page_singers = {template: "<p>page_singers</p>"};
// const page_songs = {template: "<p>page_songs</p>"};
const page_tags = {template: "<p>page_tags</p>"};



Vue.component("button-back", component_button_back);
Vue.component("lsinger", component_lsinger);
Vue.component("lsong", component_lsong);


Vue.use(VueRouter);

const routes = [
    { path: '/', component: page_main },
    { path: '/song_create', component: page_create_song },
    { path: '/singers', component: page_singers },
    { path: '/singer/:id', component: page_singer },
    { path: '/songs', component: page_songs },
    { path: '/song/:id', component: page_song },
    { path: '/tags', component: page_tags },
];

const router = new VueRouter({
    routes
});




const app = new Vue({
    el: "#app",
    template: require("./app.html"),
    router: router,

    created: ()=>{
        console.log("app created");
    },


    

    components: {
        "mainMenu": component_menu
    }
});