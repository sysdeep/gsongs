<template>
<div :style="'font-size:' + font_size">
	<div v-for="(row, i) in mtext" :key="i" v-html="row" style="white-space: pre" class="mono"></div>
</div>
</template>



<script>
/**
 * https://stackoverflow.com/questions/29144822/regex-for-standard-guitar-lyric-chord-bracketing
 *
 *
 *
 * /([A-G](#|b)?)(\(?(M|maj|major|m|min|minor|dim|sus|dom|aug)?(\+|-|add)?\d*\)?)(\/([A-G](#|b)?))?/g
 *
 * 
 */
export default {
    props: ["text", "font_scale"],



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

				// let aaa = line.match(/([A-G](#|b)?)(\(?(M|maj|major|m|min|minor|dim|sus|dom|aug)?(\+|-|add)?\d*\)?)(\/([A-G](#|b)?))?/g);
				let aaa = line.replace(/([A-G](#|b)?)(\(?(M|maj|major|m|min|minor|dim|sus|dom|aug)?(\+|-|add)?\d*\)?)(\/([A-G](#|b)?))?/g,  "<b>$&</b>");
				// console.log(aaa);

				// let r = line.replace(/\[\[/g, "<b class='chord'>").replace(/\]\]/g, "</b>");
				// qqq.push(r);
				qqq.push(aaa);
			});
			// console.log(qqq);
			// let qqq = result.replace(/\[/g, "<b>");
			// qqq = qqq.replace(/\]/g, "</b>");
			// console.log(qqq);
			return qqq;
            // return result;
            
            // return this.text;
        },


        font_size(){
        	
        	return `${this.font_scale}rem`;
        }
    }
}
</script>


<style>
.chord{
    color: rgb(83, 8, 121);
}
</style>
