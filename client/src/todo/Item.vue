<template>
	<div class="panel panel-default" :class="status_class">
		<div class="panel-heading">
			<h3 class="panel-title">
				{{ item.title }}
				<a class="pull-right" href="javascript: void(0)" @click="act_remove" style="margin: 0 5px;">удалить</a>
				<span class="pull-right">|</span>
				<a class="pull-right" href="javascript: void(0)" @click="act_edit" style="margin: 0 5px;">изменить</a>
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
						<!-- <li>[{{ item.status }}] {{tstatus}}</li> -->
						<li>{{tstatus}}</li>
						<li>{{ item.priority }}</li>
					</ul>
				</div>
			</div>
	
		</div>
	</div>
</template>

<script>

const sclasses = [
	"panel-default",
	"panel-primary",
	"panel-success",
	"panel-danger",
]


export default {
	props: ["item", "statuses"],



	methods: {
		act_edit: function(){
			this.$emit("on-edit", this.item);
		},

		act_remove: function(){
			this.$emit("on-remove", this.item);
		}
	},

	computed: {
		tstatus: function(){
			let result = this.statuses[this.item.status];
			return result? result : "---";
		},

		status_class: function(){
			let cl = sclasses[this.item.status];
			return cl? cl : "panel-warning";
		}
	}

}
</script>

<style>

</style>
