<template>
	<div class="menu_container">
		<ShortMenuItem @click="toggle">T</ShortMenuItem>
		<ShortMenuItem @click="show_page(1)">Na</ShortMenuItem>
		<ShortMenuItem @click="show_page(2)">Tg</ShortMenuItem>
		<ShortMenuItem @click="show_page(3)">St</ShortMenuItem>
	</div>
</template>

<script>
import ShortMenuItem from "./ShortMenuItem.vue"
export default {
	components: {
		ShortMenuItem
	},

	methods: {
		toggle(){
			this.$emit("toggle");
		},

		show_page(id){
			this.$emit("page", id);
		}
	}
}
</script>

<style scoped>
.menu_container{
	width: 50px;
	display: flex;
	flex-direction: column;
}
</style>