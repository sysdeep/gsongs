<template>
	<div style="position: relative;">

		<div class="spinner-overlay" v-if="status">
			<Spinner />
		</div>

		<slot></slot>
	</div>
</template>


<script>
/**
 * https://loading.io/css/
 * https://projects.lukehaas.me/css-loaders/#load5
 * 
 * блок отображения процесса загрузки
 * встраивается в страницу, чарез slot добавляется вложенный div который должен быть затемнён
 * spinner-overlay и lds-roller - отображают затемнение и спиннер
 */

import Spinner from './Spinner.vue';

export default {
	props: {
		status 	: false
	},

    components: {
        Spinner,
    }
}
</script>

