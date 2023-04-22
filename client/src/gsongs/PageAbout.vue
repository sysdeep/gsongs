<template>
	<div>
		<h3 class="page-header">О программе</h3>

		<div class="row">
			<div class="col-md-6">
				<strong>GSongs</strong> - сервис для накопления и просмотра песенок с
				аккордами))
			</div>
			<div class="col-md-6">
				<span v-html="releases"></span>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import snarkdown from "snarkdown"; // https://github.com/developit/snarkdown
import { get_releses } from "./api/other.js";

export default {
	setup() {
		const releases = ref("");

		onMounted(() => {
			get_releses().then((result) => {
				releases.value = snarkdown(result);
			});
		});

		return {
			releases,
		};
	},
};
</script>
