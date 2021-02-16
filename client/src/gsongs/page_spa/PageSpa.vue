<template>

<div>
	
	<p>
		Идея - навигация от исполнителя к списку песенок и конкретной песенке - 3 колонки
	</p>

	<p class="text-warning">
		Текущее состояние непонятное....
	</p>


	<div class="row">
		<div class="col-md-4">

			<SelectFrame />


			<SingersList />

			<SingerSongsList />



			<!--  -->
		</div>
		<div class="col-md-8">
			<SongPage />
			<!-- <router-view>
				songs list
			</router-view> -->
		</div>
		
	</div>

</div>
</template>


<script>
import SingersList from "./SingersList.vue";
import SingerSongsList from "./SingerSongsList.vue";
import SongPage from "./SongPage.vue";

import SelectFrame from "./select_frame/SelectFrame.vue";

export default {

	components: {
		SelectFrame,
		SingersList,
		SingerSongsList,
		SongPage
	}
	
}
</script>