<template>
    <button class="btn btn-primary" title="сохранить запись" @click="save">
        <i class="fa fa-floppy-o" aria-hidden="true"></i>
        <slot>Сохранить</slot>
    </button>
</template>

<script>
export default {
    methods: {
        save: function () {
            // NOTE: 2023.01.13 - после перехода на vue 3 стало отрабатывать 2 раза
            // console.log("save clicked");
            // this.$emit("click");
        },
    },
};
</script>
