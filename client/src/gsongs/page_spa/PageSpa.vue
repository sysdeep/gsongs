<template>
<div class="row">
	<div class="col-md-4">
		<SingersList />
	</div>
	<div class="col-md-4">
		<router-view>
			songs list
		</router-view>
	</div>
	<div class="col-md-4"></div>
</div>
</template>


<script>
import SingersList from "./SingersList.vue";
export default {

	components: {
		SingersList
	}
	
}
</script>