<template>
<div>


	<main-menu></main-menu>

	
    <router-view>router loading...</router-view>



</div>
</template>





<script>
import component_menu from "./Menu.vue";
export default {

	components: {
		"main-menu"	: 	component_menu
	}
}	
</script>