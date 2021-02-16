<template>
	<nav class="navbar navbar-default fixed-top navbar-light bg-light navbar-expand-lg">
		<router-link to="/" class="navbar-brand col-sm-3 col-md-2 mr-0">GSongs <small>v {{ version }}</small></router-link>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>


		<div class="collapse navbar-collapse container11" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<strong><i class="fa fa-plus" aria-hidden="true"></i> Создание</strong>
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<a href="javascript: void(0)" title="создание нового исполнителя" @click="show_create_singer" class="dropdown-item">
									<i class="fa fa-users" aria-hidden="true"></i> Исполнитель
								</a>

						<a class="dropdown-item" href="javascript: void(0)" title="создание новой песенки" @click="show_create_song">
									<i class="fa fa-align-center" aria-hidden="true"></i> Песенка
								</a>

						<a class="dropdown-item" href="javascript: void(0)" title="создание нового тэга" @click="show_create_tag">
									<i class="fa fa-tags" aria-hidden="true"></i> Тэг
								</a>
						<!-- <div class="dropdown-divider"></div> -->
					</div>
				</li>


				<li class="main_menu main_menu_singers nav-item">
					<router-link to="/singers" title="список исполнителей" class="nav-link">
						<strong><i class="fa fa-users" aria-hidden="true"></i> Исполнители</strong>
					</router-link>
				</li>

				<li class="main_menu main_menu_songs nav-item">
					<router-link to="/songs" title="список песенок" class="nav-link">
						<strong><i class="fa fa-align-center" aria-hidden="true"></i> Песенки</strong>
					</router-link>
				</li>


				<li class="main_menu main_menu_songs nav-item">
					<router-link to="/tags" title="список тэгов" class="nav-link">
						<strong><i class="fa fa-tags" aria-hidden="true"></i> Тэги</strong>
					</router-link>
				</li>

				<li class="nav-item">
					<a class="nav-link"  href="javascript: void(0)" title="поиск" @click="show_search_modal">
						<strong><i class="fa fa-search" aria-hidden="true"></i> Поиск</strong>
					</a>
				</li>

				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<strong>
						<!-- <i class="fa fa-plus" aria-hidden="true"></i>  -->
						Эксперименты
					</strong>
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<router-link to="/spa" title="" class="dropdown-item">
							<!-- <i class="fa fa-users" aria-hidden="true"></i>  -->
							Страница с быстрой навигацией
						</router-link>

						<router-link to="/main2" class="dropdown-item" title="" >
							<i class="fa fa-align-center" aria-hidden="true"></i> 
							Main2 - ???
						</router-link>

						<a class="nav-link"  href="/spa" title="" >
							Spa - отдельная страница с тестами бокового меню
						</a>
						<!-- <div class="dropdown-divider"></div> -->
					</div>
				</li>



				

				


			</ul>


			<ul class="navbar-nav ml-auto">

				<li id="main_menu_chords" class="nav-item"><a href="/chords" title="аккорды" class="nav-link">
					<strong><i class="fa fa-music" aria-hidden="true"></i> Аккорды</strong>
				</a></li>


				<li id="main_menu_service" class="nav-item"><a href="/service" title="сервис" class="nav-link">
					<strong><i class="fa fa-cogs" aria-hidden="true"></i> Сервис</strong>
				</a></li>

				<li class="nav-item"><a href="/logout" title="выход из системы" class="nav-link">
					<strong><i class="fa fa-sign-out" aria-hidden="true"></i> Выход</strong>
				</a></li>

				<li id="main_menu_about" class="nav-item">
					<router-link to="/about" title="Страница информации" class="nav-link">
						<strong><span class="glyphicon glyphicon-credit-card"></span> О программе</strong>
					</router-link>
				</li>
			</ul>
		</div>

		<!-- <div class="container">


		</div> -->

		
	</nav>
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
		},

		show_search_modal(){
			bus.$emit("show_search_modal");	
		}
	}
}
</script>