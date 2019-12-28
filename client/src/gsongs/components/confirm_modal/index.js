/**
 * модал подтверждения какого либо действия
 *
 * usage:
 * 		import confirm_modal_plugin from "@common/components/amodals/confirm";
 * 		Vue.use(confirm_modal_plugin);
 *
 * 		// everywhere in code...
 * 		this.$show_confirm("delete this item?", "option title").then(() => {console.log("yes");})
 *
 *
 * https://css-tricks.com/creating-vue-js-component-instances-programmatically/
 */
import Modal from "./Modal.vue";
export default {
	install: function(Vue, options){

		let component = Vue.extend(Modal);
		let instance = new component();
		instance.$mount();
		document.body.appendChild(instance.$el);

		Vue.prototype.$show_confirm = function(text, title){
			return instance.show(text, title)
		}
	}
}