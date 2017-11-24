<template>
	<div>
		<h3 class="page-header">О программе</h3>

		<div class="row">
			<div class="col-md-6">
				<strong>GSongs</strong> - сервис для накопления и просмотра песенок с аккордами))
			</div>
			<div class="col-md-6">
				<span v-html="releases"></span>
			</div>
		</div>
	</div>
</template>



<script>
import axios from "axios";
import snarkdown from "snarkdown";					// https://github.com/developit/snarkdown

export default {
	data: function(){
		return {
			"releases"	: ""
		}
	},

	created: function(){
		this.fetch_releases();
	},

	methods: {
		fetch_releases: function(){
			axios.get("/api/releases").then(response => {
				this.releases = snarkdown(response.data.result);
			})
		}
	}
}
</script>