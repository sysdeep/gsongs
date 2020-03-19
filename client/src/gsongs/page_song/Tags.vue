<template>
	<div class="card1">
		<div class="card-body">

		
			<!-- <h4 class="page-header">Метки</h4> -->
			
			<div class="row">
				<div class="col-md-6">
					<strong>Доступные</strong>
					<ul>
						<li v-for="(tag, index) in free_tags" :key="index">
							
							[
							<a href="javascript: void(0)" @click="add_tag(tag)" title="добавить метку к песне">
								<i class="fa fa-plus" aria-hidden="true"></i>
							</a>
							]
							<router-link :to="/tag/ + tag.id" title="перейти на страницу метки">{{ tag.name }}</router-link>
						</li> 
					</ul>
				</div>
				<div class="col-md-6">
					<strong>Выбранные</strong>
					<ul>
						<li v-for="(tag, index) in song_tags" :key="index">


							[
							<a href="javascript: void(0)" @click="remove_tag(tag)" title="удалить метку">
								<i class="fa fa-minus" aria-hidden="true"></i>
							</a>
							]
							<router-link :to="/tag/ + tag.id" title="перейти на страницу метки">{{ tag.name }}</router-link>

						</li>
					</ul>
			
				</div>
			</div>

		</div>
	</div>
</template>


<script>
import {mapGetters} from "vuex";
export default {

	props: ["songid"],


	methods: {
		add_tag: function(tag){
			let params = {"song_id": this.songid, "tag_id": tag.id};
			this.$store.dispatch("song_add_tag", params);
		},


		remove_tag: function(tag){
			let params = {"song_id": this.songid, "tag_id": tag.id};
			this.$store.dispatch("song_remove_tag", params);
		}
	},

	computed: {
		...mapGetters(["song_tag_links", "tags"]),



		song_tags(){
			let used_tags_ids = this.song_tag_links.map(t => t.id_tag);
			return this.tags.filter(tag => {
				return used_tags_ids.indexOf(tag.id) > -1;
			})
		},

		free_tags: function(){
			let used_tags_ids = this.song_tag_links.map(t => t.id_tag);
			return this.tags.filter(tag => {
				return used_tags_ids.indexOf(tag.id) < 0;
			})
			
		}
	}
}
</script>