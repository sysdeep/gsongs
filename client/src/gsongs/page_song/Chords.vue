<template>
<div>
    <h4>Аккорды</h4>

	<hr />

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
            // let list = this.text.match(/\[\[(.*?)\]\]/g);
            let list = this.text.match(/([A-G](#|b)?)(\(?(M|maj|major|m|min|minor|dim|sus|dom|aug)?(\+|-|add)?\d*\)?)(\/([A-G](#|b)?))?/g);
            if(list === null)   return [];
            let strip_list = list.map(line => line.replace(/\[\[/g, "").replace(/\]\]/g, "").replace(/\s/g, ''))

            // return strip_list;
            return [...new Set(strip_list)];
        }
    }
}
</script>

