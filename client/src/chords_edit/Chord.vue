<template>
	<div>
		



<pre>
		<p v-for="(row, index) in rows" :key="index">{{ row }}</p>
</pre>
	</div>
</template>



<script>
export default {
	props: ["item"],



	created: function(){

		// console.log("created", this.item)
		let line_array = this.item.split(",");

		line_array.forEach(item => {
			let row = this.make_line(item);
			this.rows.push(row);
		});

				// for(var i=0; i<line_array.length; i++){
				// 	var line_value = line_array[i];
				// 	text += make_line(line_value) + "\n";




				// }

	},

	data: function(){
		return {
			"max_len"	: 15,
			"rows"		: []
		}
	},

	methods: {
		make_line: function(value){
			var text = "";
			if(value == "X"){
				for(var p=1; p<this.max_len; p++){
						if(p == 1){
							text += "X";
						}else{
							text += "-";
						}
					}
			}else{
				for(var p=1; p<this.max_len; p++){
						if(p == value){
							text += value;
						}else{
							text += "-";
						}
					}
			}

			return text;
		}
	}
}
</script>