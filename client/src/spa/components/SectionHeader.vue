<template>
    <div class="column_header_q">
        <slot>


        </slot>
    </div>
</template>

<style scoped>
.column_header_q{
    display: flex;
    padding: 5px;
    align-items: center;
    min-height: 50px;
    border-bottom: 1px solid #b8b8b8;
    /* background-color: aquamarine; */
}
</style>