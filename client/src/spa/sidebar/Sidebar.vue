<template>
	<div class="sb_container">

		


		<ShortMenu @toggle="toggle_menu" @page="on_page"/>
		<template v-if="is_menu">
			<NavMenu v-if="menu_code == 1"/>
			<TagsMenu v-if="menu_code == 2" />
			<div v-if="menu_code == 3">
				settings
			</div>
		</template>
		<!-- Идея создать выпадающее меню по типу drawer из Material -->



	</div>
</template>

<script>
import ShortMenu from "./ShortMenu.vue";
import LongMenu from "./LongMenu.vue";
import NavMenu from "./nav_menu/NavMenu.vue";
import TagsMenu from "./tags_menu/TagsMenu.vue";

export default {
	data(){
		return {
			is_menu 	: true,
			menu_code	: 1
		}
	},
	
	components: {
		ShortMenu,
		NavMenu,
		TagsMenu
	},

	methods: {
		toggle_menu(){
			this.is_menu = !this.is_menu;
		},

		on_page(page_id){
			this.menu_code = page_id;
		}
	}
}

</script>

<style scoped>
.sb_container{
	display: flex;
	flex-direction: row;
	/* min-width: 250px; */
    /* width: 750px; */
    height: 300px;
    border: 1px solid gray;
}

/* .sb_short{
	width: 25%;
	background-color: green;
}

.sb_long{
	width: 75%;

	background-color: blue;
} */
</style>