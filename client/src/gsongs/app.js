import { createApp, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import "./app.css";
import { store } from "./storage/store";

import App from "./App.vue";

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

import { routes } from "./router";
// import { actionTypes as tagsActionTypes } from "./storage/modules/tags";

const router = createRouter({
	routes,
	history: createWebHistory("/app/"),
	// mode: "history",
	// base: "/app/",
});

// const app = createApp(App);

const app = createApp({
	render: () => h(App),
	created() {
		//--- preload - big
		// this.$store.dispatch("preload_data");

		//--- preload main data
		this.$store.dispatch("fetch_singers");
		// this.$store.dispatch("fetch_songs");

		// TODO: recover
		// this.$store.dispatch(tagsActionTypes.GetTags);

		// this.$store.dispatch("fetch_tag_song_links");
	},
});

// Vue.component("button-back", component_button_back);
app.component("button-save", component_button_save);
app.component("button-remove", component_button_remove);
app.component("lsinger", component_lsinger);
app.component("lsong", component_lsong);
app.component("modal-remove", component_modal_remove);
app.component("BtnRefresh", BtnRefresh);
app.component("BtnCreate", BtnCreate);
app.component("BtnBack", BtnBack);
app.component("Spinner", Spinner);

// app.use(VueRouter);
app.use(toastr);
app.use(alert);
// Vue.use(bmodal);														// пока не используем...
app.use(confirm_modal);

app.use(store);
app.use(router);
app.mount("#app");

// const app = new Vue({
// 	el: "#app",
// 	// template: require("./app.html"),
// 	render: (h) => h(App),
// 	router: router,
// 	store,
//
// 	created: function(){
// 		//--- preload - big
// 		// this.$store.dispatch("preload_data");
//
// 		//--- preload main data
// 		this.$store.dispatch("fetch_singers");
// 		// this.$store.dispatch("fetch_songs");
// 		this.$store.dispatch(tagsActionTypes.GetTags);
//
//
//
// 		// this.$store.dispatch("fetch_tag_song_links");
// 	},
//
//
//
//
// 	// components: {
// 	// 	"mainMenu": component_menu
// 	// }
// });
