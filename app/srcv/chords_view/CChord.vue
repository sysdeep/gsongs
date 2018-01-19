<template>
	<span class="ch_item">
		


		<!-- <div class="ch_line">{{ item }}</div> -->

		<canvas height1='1504' width1='200' :id="uel">Обновите браузер</canvas>


	</span>
</template>



<script>
const STRINGS = 6;
const GLIFS = 10;

const STRING_SPACE = 15;
const GLIF_SPACE = 20;


export default {
	props: ["item"],


	data: function(){
		return {
			ctx			: null,
			uel			: ""
		}
	},


	created: function(){
		let uid = this.item.split(",").join("");
		this.uel = "chitem_"+uid;
		console.log("created", this.item);
	},

	mounted(){
		var example = document.getElementById(this.uel);
		example.width = GLIFS * GLIF_SPACE;
		example.height = STRINGS * STRING_SPACE;
		this.ctx     = example.getContext('2d');


		this.redraw();

	},

	watch: {
		item(new_value){
			this.redraw();
		}
	},

	

	methods: {


		redraw(){
			this.clear();
			this.draw_base();
			this.draw_strings();
			this.draw_glifs();
			this.draw_lstrings();
		},

		clear(){
			let width = GLIF_SPACE * GLIFS;
			let height = STRING_SPACE * STRINGS;
			this.ctx.clearRect(0, 0, width, height);
		},

		draw_base(){
			let width = GLIF_SPACE * GLIFS;
			let height = STRING_SPACE * STRINGS;
			this.ctx.strokeRect(0, 0, width, height);
		},

		draw_strings(){
			let y = 0;
			let x = GLIF_SPACE * GLIFS;
			this.ctx.beginPath();
			for(let i=0; i<STRINGS; i++){
				this.ctx.moveTo(0, y);
				this.ctx.lineTo(x, y);
				y = y + STRING_SPACE;
			}
			this.ctx.stroke();
		},

		draw_glifs(){
			let x = 0;
			let y = STRING_SPACE * STRINGS;
			this.ctx.beginPath();
			for(let i=0; i<GLIFS; i++){
				this.ctx.moveTo(x, 0);
				this.ctx.lineTo(x, y);
				x = x + GLIF_SPACE;
			}
			this.ctx.stroke();
		},


		draw_lstrings(){
			let items = this.item.split(",");
			this.ctx.beginPath();
			this.ctx.font = "bold 12px UbuntuRegular";
			for(let row=0; row<items.length; row++){
				let lstring = items[row];
				if(lstring == "0"){
					continue;
				}

				if(lstring == "X"){
					for(let x=0; x<GLIFS; x++){
						let pos_x = x * GLIF_SPACE;
						let pos_y = (row+1) * STRING_SPACE;
						// this.ctx.fillText("x", pos_x, pos_y);
						this.draw_frect(pos_x, pos_y, "X");
					}
				}

				let col = parseInt(lstring);
				let pos_x = (col-1) * GLIF_SPACE;
				let pos_y = (row+1) * STRING_SPACE;

				// this.ctx.fillText(lstring, pos_x, pos_y);
				this.draw_frect(pos_x, pos_y, lstring);


			}
			this.ctx.stroke();

		},


		draw_frect(pos_x, pos_y, text){
			// this.ctx.strokeRect(pos_x, pos_y, GLIF_SPACE, STRING_SPACE);
			// 
			let mtext = this.ctx.measureText(text);
			// console.log(mtext);
			let left_offset = (GLIF_SPACE - mtext.width)/2;
			let top_offset = (STRING_SPACE - 12)/2;
			// this.ctx.fillText(text, pos_x+left_offset, pos_y+top_offset);
			this.ctx.fillText(text, pos_x+left_offset, pos_y - top_offset - 1);
		},








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


<style scoped>
	/*.ch_line{text-align: center;}*/
	/*.ch_item{
		height: 300px;
	}*/
</style>