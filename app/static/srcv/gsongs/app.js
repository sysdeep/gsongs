import Vue from "vue";
import VueRouter from 'vue-router';

import {store} from "./storage/store";




// import component_menu from "./menu/menu";
// import page_main from "./page_main/page_main";
// import page_singers from "./page_singers/page_singers";
import component_menu from "./Menu.vue";


import component_button_back from "./components/ButtonBack.vue";
import component_button_save from "./components/ButtonSave.vue";
import component_button_remove from "./components/ButtonRemove.vue";
import component_lsinger from "./components/LSinger.vue";
import component_lsong from "./components/LSong.vue";
import component_modal_remove from "./components/ModalRemove.vue";

import {routes} from "./router";



Vue.component("button-back", component_button_back);
Vue.component("button-save", component_button_save);
Vue.component("button-remove", component_button_remove);
Vue.component("lsinger", component_lsinger);
Vue.component("lsong", component_lsong);
Vue.component("modal-remove", component_modal_remove);


Vue.use(VueRouter);



const router = new VueRouter({
    routes
});




const app = new Vue({
    el: "#app",
    template: require("./app.html"),
    router: router,
    store,

    created: function(){


        //--- preload main data
        this.$store.dispatch("fetch_singers");
        this.$store.dispatch("fetch_songs");
        this.$store.dispatch("fetch_tags");
        this.$store.dispatch("fetch_tag_song_links");
    },


    

    components: {
        "mainMenu": component_menu
    }
});