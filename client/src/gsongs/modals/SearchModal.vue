<template>
	<div class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-dialog-scrollable modal-xl" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">
						<i class="fa fa-search" aria-hidden="true"></i> Поиск
					</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body">
					<div>
						<input type="text" class="form-control" v-model.trim="search_term" @input="debounce_search"
							placeholder="быстрый поиск" />
					</div>

					<br />

					<div>
						<div class="list-group">
							<a href="javascript: void(0)" class="list-group-item list-group-item-action" v-for="(song, i) in songs"
								:key="i" @click="on_select(song.id)">
								<div class="d-flex w-100 justify-content-between">
									<h6 class="mb-1">
										{{ song.name }}
									</h6>
									<h6 class="mb-1">
										{{ get_singer(song.singer) }}
									</h6>
									<!-- <small>3 days ago</small> -->
								</div>
								<!-- <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> -->
								<!-- <small>Donec id elit non mi porta.</small> -->
							</a>
						</div>

						<div v-if="search_term.length < 3">Введите запрос</div>

						<!-- <Spinner v-if="processed" /> -->
						<!-- <Spinner  /> -->
					</div>
				</div>

				<div class="modal-footer d-flex justify-content-between">
					<div>
						<i class="fa fa-spinner fa-spin" aria-hidden="true" v-if="processed"></i>
						<span v-else> найдено: {{ songs.length }} </span>
					</div>

					<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
						<i class="fa fa-times" aria-hidden="true"></i> Закрыть
					</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
</template>

<script>
import { mapGetters } from "vuex";
import bus from "../bus";
import { get_default_tag } from "../utils";

export default {
	data() {
		return {
			search_term: "",
			processed: false,

			__modal: null,
		};
	},

	created() {
		bus.$on("show_search_modal", this.show);
	},

	mounted() {
		// this.__modal = new bootstrap.Modal(this.$el);
	},

	methods: {
		show() {
			this.__open();
		},

		start_search() {
			if (this.search_term.length < 3) {
				return false;
			}

			this.processed = true;
			this.$store
				.dispatch("fetch_filtered_songs", this.search_term)
				.then((_) => {
					this.processed = false;
				});
		},

		//--- отправка запроса с поиском по истечению задержки на ввод
		debounce_search(event) {
			clearTimeout(this.sdebounce);
			this.sdebounce = setTimeout(() => {
				this.start_search();
			}, 600);
		},

		get_singer: function (singer_id) {
			return this.$store.getters.get_singer_name(singer_id);
		},

		on_select(song_id) {
			this.__close();
			this.$router.push(`/song/${song_id}`);
		},

		__open() {
			this.__modal.show();
		},

		__close() {
			this.__modal.hide();
		},
	},

	computed: {
		...mapGetters(["songs"]),
	},
};
</script>
