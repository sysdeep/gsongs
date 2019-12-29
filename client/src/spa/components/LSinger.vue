<template>
    <router-link :to='/singer/ + cdata.id' title='перейти на страницу исполнителя'>
        {{ cdata.name }}
    </router-link>
</template>



<script>

export default {
    props: ["cdata"]
}
</script>