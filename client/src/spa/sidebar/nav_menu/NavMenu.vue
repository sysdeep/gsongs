<template>
	<div class="nav_menu">
		
		<Singers />
		<SingerSongs />

	</div>
</template>

<script>

import Singers from "./Singers.vue";
import SingerSongs from "./SingerSongs.vue";

export default {
	components: {
		Singers,
		SingerSongs
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