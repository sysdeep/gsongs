<template>
	<div>
		Singer


		<button @click="back">back</button>
	</div>
</template>



<script>
export default {
	methods: {
		back(){
			this.$emit("back");
		}
	}
}
</script>

