import Vue from "vue";
import VueRouter from 'vue-router'


import component_menu from "./menu/menu";
import page_main from "./page_main/page_main";
import page_singers from "./page_singers/page_singers";


const page_create_song = {template: "<p>page_create_song</p>"};
// const page_singers = {template: "<p>page_singers</p>"};
const page_songs = {template: "<p>page_songs</p>"};
const page_tags = {template: "<p>page_tags</p>"};



Vue.use(VueRouter);

const routes = [
    { path: '/', component: page_main },
    { path: '/song_create', component: page_create_song },
    { path: '/singers', component: page_singers },
    { path: '/songs', component: page_songs },
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