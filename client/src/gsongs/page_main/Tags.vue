<template>
	<div class="card border-warning">
		<div class="card-header bg-warning text-white">
			Метки
			<span class="pull-right badge badge-secondary">{{ tags.length }}</span>
		</div>

		<!-- <table class="table table-sm">
			<tbody>
				<tr v-for="(tag, index) in ftags" :key="index">
					<td><router-link :to="/tag/ + tag.id">{{ tag.name }}</router-link></td>
				</tr>
			</tbody>
		</table> -->
		<!-- <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul> -->

		<!-- <div class="card-body"> -->
		<div class="scroll_wrapper">
			<ul>
				<li v-for="(tag, index) in tags" :key="index">
					<router-link :to="/tag/ + tag.id">{{ tag.name }}</router-link>
				</li>
			</ul>
		</div>
		<!-- </div> -->
	</div>
</template>




<script>
import {mapGetters} from "vuex";
export default {




	computed: {
		...mapGetters(["tags", "tags_loaded"]),

		
	}
}
</script>

<style scoped>
.scroll_wrapper{
	/*height: calc(100vh - 230px);*/
	height: 40vh;
	/*height: 500px;*/
	overflow-y: auto;
	overflow-x: hidden;
}

</style>