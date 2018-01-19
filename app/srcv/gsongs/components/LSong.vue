<template>
    <router-link :to='/song/ + cdata.id' title='перейти на страницу песни'>
        {{ cdata.name }}
    </router-link>
</template>



<script>

export default {
    props: ["cdata"]
}
</script>