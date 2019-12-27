<template>
<div>
    <h4>Аккорды</h4>

    <ul class="list-inline">
        <li class="list-inline-item" v-for="(chord, i) in chords_list" :key="i">{{ chord }}</li>
    </ul>

</div>
</template>


<script>
export default {
    props: ["text"],


    computed: {
        chords_list(){
            let list = this.text.match(/\[\[(.*?)\]\]/g);
            if(list === null)   return [];
            let strip_list = list.map(line => line.replace(/\[\[/g, "").replace(/\]\]/g, "").replace(/\s/g, ''))

            // return strip_list;
            return [...new Set(strip_list)];
        }
    }
}
</script>

