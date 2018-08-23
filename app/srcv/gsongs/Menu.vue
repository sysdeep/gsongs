<template>
	<div class="navbar navbar-default navbar-fixed-top">
		<div class="container">



			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>

				<router-link to="/" class="navbar-brand">GSongs <small>v {{ version }}</small></router-link>

			</div>

			<div class="navbar-collapse collapse">

				<ul class="nav navbar-nav">

				</ul>


				<ul class="nav navbar-nav navbar-right">



					<li class="dropdown">
          				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          					<strong><i class="fa fa-plus" aria-hidden="true"></i> Создание</strong> <span class="caret"></span></a>
          				<ul class="dropdown-menu">
            				<li>
            					<a href="javascript: void(0)" title="создание нового исполнителя" @click="show_create_singer">
									<i class="fa fa-users" aria-hidden="true"></i> Исполнитель
								</a>
            				</li>
            				<li>
            					<a href="javascript: void(0)" title="создание новой песенки" @click="show_create_song">
									<i class="fa fa-align-center" aria-hidden="true"></i> Песенка
								</a>
            				</li>
            				<li>
            					<a href="javascript: void(0)" title="создание нового тэга" @click="show_create_tag">
									<i class="fa fa-tags" aria-hidden="true"></i> Тэг
								</a>
            				</li>
            
          				</ul>
        			</li>


					<!-- <li class="main_menu main_menu_create">
						<a href="javascript: void(0)" title="создание новой песенки" @click="show_create_song">
							<strong><i class="fa fa-plus" aria-hidden="true"></i> Создание</strong>
						</a>
					</li> -->
					<li class="main_menu main_menu_singers">
						<router-link to="/singers" title="список исполнителей">
							<strong><i class="fa fa-users" aria-hidden="true"></i> Исполнители</strong>
						</router-link>
					</li>
					<li class="main_menu main_menu_songs">
						<router-link to="/songs" title="список песенок">
							<strong><i class="fa fa-align-center" aria-hidden="true"></i> Песенки</strong>
						</router-link>
					</li>


					<li class="main_menu main_menu_songs">
						<router-link to="/tags" title="список тэгов">
							<strong><i class="fa fa-tags" aria-hidden="true"></i> Тэги</strong>
						</router-link>
					</li>



					<li id="main_menu_chords"><a href="/chords" title="аккорды">
						<strong><i class="fa fa-music" aria-hidden="true"></i> Аккорды</strong>
					</a></li>


					<li id="main_menu_service"><a href="/service" title="сервис">
						<strong><i class="fa fa-cogs" aria-hidden="true"></i> Сервис</strong>
					</a></li>

					<li><a href="/logout" title="выход из системы">
						<strong><i class="fa fa-sign-out" aria-hidden="true"></i> Выход</strong>
					</a></li>

					<li id="main_menu_about"><router-link to="/about" title="Страница информации">
						<strong><span class="glyphicon glyphicon-credit-card"></span> О программе</strong>
					</router-link></li>



				</ul>





			</div>

		</div>
	</div>
</template>


<script>
import bus from "./bus";

export default {
	data: function(){
		return {
			"version"   : window.app.version,
		}
	},

	methods: {
		show_create_song(){
			bus.$emit("show_create_song");
		},

		show_create_singer(){
			bus.$emit("show_create_singer");
		},

		show_create_tag(){
			bus.$emit("show_create_tag");
		}
	}
}
</script>