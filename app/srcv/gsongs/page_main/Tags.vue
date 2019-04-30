<template>
	<div>
		<h4 class="page-header">
			Метки
			<span class="pull-right badge badge-secondary">{{ ftags.length }}</span>
		</h4>

		<ul>
			<li v-for="(tag, index) in ftags" :key="index">
				<router-link :to="/tag/ + tag.id">{{ tag.name }}</router-link>
			</li>
		</ul>
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