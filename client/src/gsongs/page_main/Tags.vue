<template>
	<div class="card">
		<div class="card-header">
			Метки
			<span class="pull-right badge badge-secondary">{{ ftags.length }}</span>
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
			<ul>
				<li v-for="(tag, index) in ftags" :key="index">
					<router-link :to="/tag/ + tag.id">{{ tag.name }}</router-link>
				</li>
			</ul>
		<!-- </div> -->
	</div>
</template>




<script>
export default {




	computed: {
		ftags: function(){
			return this.$store.state.tags;
		}
	}
}
</script>