<template>
    <div>

        <!-- <Modal v-model="is_modal"/> -->
        <Modal v-if="is_modal">
            <template v-slot:header>header from slot</template>
            <template v-slot:body>header from slot</template>
            <template v-slot:footer>header from slot</template>
        </Modal>


        <button class="btn btn-primary" @click="open">Open</button>
        <button class="btn btn-primary" @click="close">Close</button>

    </div>
</template>

<script>
import Modal from "./ModalComp.vue";
export default {
    data: function(){
        return {
            is_modal: false
        }
    },

    components: {
        Modal
    },

    methods: {
        open(){
            this.is_modal = true;
        },

        close(){
            this.is_modal = false;
        }
    }
}
</script>

<style>

</style>
