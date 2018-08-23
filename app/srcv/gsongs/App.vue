<template>
<div>


	<main-menu></main-menu>

	
    <router-view>router loading...</router-view>

    <modal-singer-edit></modal-singer-edit>
    <modal-song-edit></modal-song-edit>

</div>
</template>





<script>
import component_menu from "./Menu.vue";
import modal_singer_edit from "./modals/SingerEdit.vue";
import modal_song_edit from "./modals/SongEdit.vue";

export default {

	components: {
		"main-menu"			: 	component_menu,
		"modal-singer-edit"	: modal_singer_edit,
		"modal-song-edit"	: modal_song_edit
	}
}	
</script>