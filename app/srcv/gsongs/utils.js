// import storage from "./storage";
// import net from "./net";
// import Q from "q";


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

// export function update_singer(idata){
//     var defer = Q.defer();
//     net.update_singer(idata).then((response)=>{
//         console.log(response);
//         defer.resolve();
//     })
//     return defer.promise;
// }



// var def = $q.defer();
// 			$http.post("/update_singer", sdata).success(function(response){
// 				sdata.updated = response.singer.updated;
// 				angular.copy(sdata, data.singer_current);
// 				def.resolve();
// 			}).error(function(response){
// 				console.log(response);
// 				def.reject();
// 			});

// 			return def.promise;