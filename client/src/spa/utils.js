export function go_back(){
	window.history.back();
}


export function get_default_song(){
	return {
		id			: 0,
		singer		: "",					// исполнитель
		author		: "",					// автор
		name 		: "",					// название песни
		album		: "",					// альбом
		text		: "",					// текст
		description	: "",					// доп. описание
		// tags		: Array,				// теги
		genre		: "", 					// жанр
		created		: "",					// дата создания
		updated		: "",					// дата изменения
		api 		: 1
	};
}


export function get_default_singer(){
	return {
		"id"        : 0,
		"name"      : ""
	}
}

export function get_default_tag(){
	return {
		"id"        : 0,
		"name"      : ""
	}
}
