<template>
    <button class="btn btn-primary" title="сохранить запись" @click="save">
        <i class="fa fa-floppy-o" aria-hidden="true"></i>
        <slot>Сохранить</slot>
    </button>
</template>


<script>
export default {
    methods: {
        save: function(){
            this.$emit("click");
        }
    }
}
</script>


