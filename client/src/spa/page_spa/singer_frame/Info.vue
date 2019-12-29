<template>
	<div>
		<div v-if="singer">
			<dl class="row">
						<dt class="col-sm-3">Название</dt>
						<dd class="col-sm-9">{{ singer.name }}</dd>
		
						<dt class="col-sm-3">Создание</dt>
						<dd class="col-sm-9">{{ singer.created }}</dd>
		
						<dt class="col-sm-3">Обновление</dt>
						<dd class="col-sm-9">{{ singer.updated }}</dd>
					</dl>
		
		
					<!-- <div class="pull-right">
						<button-remove @click="show_remove" :disabled="is_songs"></button-remove>

						<button class="btn btn-primary" @click="show_edit_singer()"><i class="fa fa-pencil" aria-hidden="true"></i> Изменить</button>
					</div> -->
		</div>
		
	</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
	

	computed: {
		...mapGetters(["singer", "singer_loaded"]),
	}
}
</script>