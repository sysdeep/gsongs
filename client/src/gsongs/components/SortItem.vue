<template>
	<span>
		<span v-if="dname != cname">
			<i aria-hidden="true" class="fa fa-sort text-muted"></i>
		</span>
		<span v-else>
			<i aria-hidden="true" class="fa fa-sort-asc" v-if="direction === 1"></i>
			<i aria-hidden="true" class="fa fa-sort-desc" v-else></i>
		</span>
	</span>
</template>

<script>
/**
 * <SortItem dname="Shifr" :cname="current_field_name" :direction="current_direction" />
 */
export default {
	props: {
		//--- заданное поле сортировки
		dname: {
			type 		: String,
			required 	: true,
		}, 

		//--- тек. поле сортировки
		cname: {
			type 		: String,
			required 	: true,
		}, 

		//--- направление сортировки 1 - asc, -1 - desc
		direction: {
			type 		: Number,			
			required	: true,
		}
	}
}
</script>