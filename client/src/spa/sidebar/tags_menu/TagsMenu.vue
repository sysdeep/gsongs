<template>
	<div class="nav_menu">
		
		<Tags />
		<TagSongs />

	</div>
</template>

<script>

import Tags from "./Tags.vue";
import TagSongs from "./TagSongs.vue";

export default {
	components: {
		Tags,
		TagSongs
	}
}
</script>

<style scoped>
.nav_menu{
	/* width: 500px; */
	display: flex;
	flex-direction: row;
	border: 1px solid green;
}
</style>