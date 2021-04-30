import Vue from "vue";
import VueRouter from 'vue-router';

import "./app.css";
import {store} from "./storage/store";



import App from "./App.vue";
// import component_menu from "./menu/menu";
// import page_main from "./page_main/page_main";
// import page_singers from "./page_singers/page_singers";
// import component_menu from "./Menu.vue";


import component_button_back from "./components/ButtonBack.vue";
import component_button_save from "./components/ButtonSave.vue";
import component_button_remove from "./components/ButtonRemove.vue";
import component_lsinger from "./components/LSinger.vue";
import component_lsong from "./components/LSong.vue";
import component_modal_remove from "./components/ModalRemove.vue";

import Spinner from "./components/Spinner.vue";
import BtnRefresh from "./components/BtnRefresh.vue";
import BtnCreate from "./components/BtnCreate.vue";
import BtnBack from "./components/BtnBack.vue";
// import bmodal from "./components/bmodal/index.js";						// пока не используем...
import confirm_modal from "./components/confirm_modal/index.js";

import toastr from "./toastr";
import alert from "./alert";


import {routes} from "./router";
import {actionTypes as tagsActionTypes} from "./storage/modules/tags";


// Vue.component("button-back", component_button_back);
Vue.component("button-save", component_button_save);
Vue.component("button-remove", component_button_remove);
Vue.component("lsinger", component_lsinger);
Vue.component("lsong", component_lsong);
Vue.component("modal-remove", component_modal_remove);
Vue.component("BtnRefresh", BtnRefresh);
Vue.component("BtnCreate", BtnCreate);
Vue.component("BtnBack", BtnBack);
Vue.component("Spinner", Spinner);


Vue.use(VueRouter);
Vue.use(toastr);
Vue.use(alert);
// Vue.use(bmodal);														// пока не используем...
Vue.use(confirm_modal);



const router = new VueRouter({
	routes,
	mode 	: 'history',
	base	: "/app/",
});




const app = new Vue({
	el: "#app",
	// template: require("./app.html"),
	render: (h) => h(App),
	router: router,
	store,

	created: function(){
		//--- preload - big
		// this.$store.dispatch("preload_data");

		//--- preload main data
		this.$store.dispatch("fetch_singers");
		// this.$store.dispatch("fetch_songs");
		this.$store.dispatch(tagsActionTypes.GetTags);
		
		
		
		// this.$store.dispatch("fetch_tag_song_links");
	},


	

	// components: {
	// 	"mainMenu": component_menu
	// }
});