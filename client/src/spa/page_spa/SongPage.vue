<template>
	<div>
		Song

		{{ song }}
	</div>
</template>


<script>
import {mapGetters} from "vuex";
export default {
	
	computed: {
		...mapGetters(["song"])
	}
}
</script>