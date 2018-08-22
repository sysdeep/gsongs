<template>
<div>


	<main-menu></main-menu>

	
    <router-view>router loading...</router-view>

    <modal-singer-edit></modal-singer-edit>

</div>
</template>





<script>
import component_menu from "./Menu.vue";
import modal_singer_edit from "./modals/SingerEdit.vue";
export default {

	components: {
		"main-menu"			: 	component_menu,
		"modal-singer-edit"	: modal_singer_edit
	}
}	
</script>