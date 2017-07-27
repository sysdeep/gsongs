<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">
				{{ item.title }}
				<span class="pull-right">
					<a href="javascript: void(0)" ng-click="self.edit(item)">edit</a>
					|
					<a href="javascript: void(0)" ng-click="self.remove(item)">remove</a>
				</span>
			</h3>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-md-8">
					{{ item.description }}
				</div>
				<div class="col-md-4">
					<ul>
						<li>{{ item.created }}</li>
						<li>{{ item.updated }}</li>
						<li>{{ item.status }}</li>
						<li>{{ item.priority }}</li>
					</ul>
				</div>
			</div>
	
		</div>
	</div>
</template>

<script>
export default {
	props: ["item"]

}
</script>

<style>

</style>
