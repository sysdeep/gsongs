<template>
	<div class="menu_item" @click="on_click">
		
		<slot></slot>
		
	</div>
</template>

<script>
export default {
	methods: {
		on_click(){
			this.$emit("click");
		}
	}
}
</script>

<style scoped>
.menu_item{
	width: 50px;
	height: 50px;
	text-align: center;
	vertical-align: center;
	display: block;
	border: 1px solid gray;
	cursor: pointer;
}
</style>