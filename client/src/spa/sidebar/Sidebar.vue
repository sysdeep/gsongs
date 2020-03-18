<template>
	<div class="sb_container">

		Идея создать выпадающее меню по типу drawer из Material


		<div class="sb_short">
			<ShortMenu />
		</div>
		<div class="sb_long">
			<LongMenu />
		</div>



	</div>
</template>

<script>
import ShortMenu from "./ShortMenu.vue";
import LongMenu from "./LongMenu.vue";

export default {
	components: {
		ShortMenu,
		LongMenu,
	}
}

</script>

<style scoped>
.sb_container{
	display: flex;
	flex-direction: row;
	min-width: 250px;
    width: 250px;
    height: 300px;
    border: 1px solid gray;
}

.sb_short{
	width: 25%;
	background-color: green;
}

.sb_long{
	width: 75%;

	background-color: blue;
}
</style>