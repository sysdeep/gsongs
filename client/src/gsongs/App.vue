<template>
<div>


	<main-menu></main-menu>

	<!-- <SideBar /> -->

    <router-view>router loading...</router-view>

    <modal-singer-edit></modal-singer-edit>
    <modal-song-edit></modal-song-edit>
    <modal-tag-edit></modal-tag-edit>
    <SearchModal />

</div>
</template>





<script>
import component_menu from "./Menu.vue";
import modal_singer_edit from "./modals/SingerEdit.vue";
import modal_song_edit from "./modals/SongEdit.vue";
import modal_tag_edit from "./modals/TagEdit.vue";
import SearchModal from "./modals/SearchModal.vue";
import SideBar from "./sidebar/SideBar.vue"

export default {

	components: {
		"main-menu"			: 	component_menu,
		"modal-singer-edit"	: modal_singer_edit,
		"modal-song-edit"	: modal_song_edit,
		"modal-tag-edit"	: modal_tag_edit,

		// SideBar,
		
		SearchModal,
	}
}	
</script>