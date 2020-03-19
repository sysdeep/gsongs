<template>
	<div class="main_nav_item" @click="on_click">
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
.main_nav_item{
	width: 40px;
	height: 40px;
	border: 1px solid gray;
	cursor: pointer;
}
</style>