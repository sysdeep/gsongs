<template>
    <button class="btn btn-default" @click="go_back" title="вернуться назад">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        <slot>Назад</slot>
    </button>
</template>


<script>
export default {
    methods: {
        go_back: function(){
            window.history.back();
        }
    }
}
</script>