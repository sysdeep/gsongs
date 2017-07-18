<template>
    <button class="btn btn-danger" title="удалить запись" @click="save">
        <i class="fa fa-trash" aria-hidden="true"></i>
        <slot>Удалить</slot>
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


