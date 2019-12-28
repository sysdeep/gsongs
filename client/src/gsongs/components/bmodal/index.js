/**
 * компонент модального окна - обёртка над bootstrap-modal
 *
 * import BModal from "@common/components/bmodal";
 * Vue.use(BModal)
 *
 *
 * <b-modal v-model="tmodal" animation="fade" size="sm">
		<b-modal-header>title</b-modal-header>
		<b-modal-body>
			body
		</b-modal-body>
		<b-modal-footer>
			<button @click="tmodal = false">cl</button>
		</b-modal-footer>
	</b-modal>
 */
// import Vue from "vue";
import Modal from "./Modal.vue";
import ModalHeader from "./ModalHeader.vue";
import ModalBody from "./ModalBody.vue";
import ModalFooter from "./ModalFooter.vue";



// Vue.component("b-modal", Modal);
// Vue.component("b-modal-header", ModalHeader);
// Vue.component("b-modal-body", ModalBody);
// Vue.component("b-modal-footer", ModalFooter);



export default {
	install: function(Vue, options){
		Vue.component("b-modal", Modal);
		Vue.component("b-modal-header", ModalHeader);
		Vue.component("b-modal-body", ModalBody);
		Vue.component("b-modal-footer", ModalFooter);

	}
}