<template>
<div>


	<main-menu></main-menu>


	<!-- <div style="height: 60px"></div> -->


	<div class="container-fluid">
		<div class="row">
			<FrameSingers />
			<div class="col-md-9">
				<router-view>router loading...</router-view>
			</div>
		</div>
	</div>


	<!-- singers -->
	
    






    <modal-singer-edit></modal-singer-edit>
    <modal-song-edit></modal-song-edit>
    <modal-tag-edit></modal-tag-edit>

</div>
</template>





<script>
import component_menu from "./Menu.vue";
import modal_singer_edit from "./modals/SingerEdit.vue";
import modal_song_edit from "./modals/SongEdit.vue";
import modal_tag_edit from "./modals/TagEdit.vue";

import FrameSingers from "./frame_singers/FrameSingers.vue";

export default {

	components: {
		"main-menu"			: 	component_menu,
		"modal-singer-edit"	: modal_singer_edit,
		"modal-song-edit"	: modal_song_edit,
		"modal-tag-edit"	: modal_tag_edit,

		FrameSingers
	}
}	
</script>