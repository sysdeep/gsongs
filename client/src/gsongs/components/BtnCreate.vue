<template>
	<button type="button" class="btn btn-outline-primary" title="создать" @click="on_click()">
	<!-- <button type="button" class="btn btn-outline-secondary" title="обновить"> -->
		<i class="fa fa-plus" :class="{'fa-spin': loading}" aria-hidden="true"></i>
		<slot>
			Создать
		</slot>
	</button>
</template>


<script>
export default {

	props: {
		loading: Boolean,
	},

	methods: {
		on_click(){
			this.$emit("click");
		}
	}
}
</script>