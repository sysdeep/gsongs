<template>
<div>
	<div v-for="(row, i) in mtext" :key="i" v-html="row" style="white-space: pre" class="mono"></div>
</div>
</template>



<script>
export default {
    props: ["text"],



    computed: {
        /**
		 *
		 *
		 * 
		 * var s = "qqq [E] ddd [A] ddd"
		 * s.match(/\[(.*?)\]/g)
		 * ["[E]", "[A]"]
		 *
		 *
		 * 
		 * @return {[type]} [description]
		 */
        mtext(){
            let result = this.text;
			let lines = result.split("\n");
			let qqq = [];
			lines.forEach(line => {
				let r = line.replace(/\[\[/g, "<b class='chord'>").replace(/\]\]/g, "</b>");
				qqq.push(r);
			});
			// console.log(qqq);
			// let qqq = result.replace(/\[/g, "<b>");
			// qqq = qqq.replace(/\]/g, "</b>");
			// console.log(qqq);
			return qqq;
            // return result;
            
            // return this.text;
        }
    }
}
</script>


<style>
.chord{
    color: rgb(83, 8, 121);
}
</style>
