<template>
	<div class="main_nav">
		<MainNavItem @click="on_toggle">T</MainNavItem>
		<MainNavItem>A</MainNavItem>
		<MainNavItem>B</MainNavItem>
	</div>
</template>

<script>
import MainNavItem from "./MainNavItem.vue";
export default {
	components: {
		MainNavItem,
	},

	methods: {
		on_toggle(){
			this.$emit("toggle");
		}
	}
}
</script>