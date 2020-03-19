<template>
	<div class="sidebar">
		<MainNav @toggle="toggle_menu"/>
		<div class="bmenu" v-if="is_menu">
			<div>
				big menu
			</div>
		</div>
	</div>
</template>

<script>
import MainNav from "./main_nav/MainNav.vue";
export default {
	data(){
		return {
			is_menu 	: true,
		}
	},

	components: {
		MainNav,
	},

	methods: {
		toggle_menu(){
			this.is_menu = !this.is_menu;
		}
	}
}
</script>

<style scoped>
.sidebar{
	position: fixed;
	top: 50px;
	left: 0px;
	display: flex;
	flex-direction: row;
	z-index: 1000;
	background-color: darksalmon;
	height: 100vh;
}
.bmenu{
	width: 50vh;
	border: 1px solid green;
}
</style>