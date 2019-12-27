<template>
	<div>
		
		<h4 class="page-header">Метки</h4>
		
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
</template>


<script>
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
		song_tags: function(){
			let links = this.$store.getters.get_song_tags(this.songid);

			let tags_id = links.map(item => item.id_tag);

			
			let result = this.$store.state.tags.filter(tag => {
				return tags_id.indexOf(tag.id) > -1;
			})

			return result;
		},



		free_tags: function(){
			let links = this.$store.getters.get_song_tags(this.songid);

			let tags_id = links.map(item => item.id_tag);

			
			let result = this.$store.state.tags.filter(tag => {
				return tags_id.indexOf(tag.id) == -1;
			})

			return result;	
		}
	}
}
</script>