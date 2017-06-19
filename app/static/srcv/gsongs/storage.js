import net from "./net";
import Q from "q";

var state = {
    "singers": [],
    "singers_loaded": false,

    "songs": [],
    "songs_loaded": false,
}


export default {
    "state": state,
    "fetch_singers": fetch_singers,
    "fetch_songs": fetch_songs,
    "need_singers": need_singers,
    "need_songs": need_songs
}




function fetch_singers() {
    var defer = Q.defer();

    state.singers_loaded = false;
    net.get_singers().then(response => {
        state.singers = response.data.singers;
        state.singers_loaded = true;

        defer.resolve();
    })

    return defer.promise;
}


function fetch_songs() {
    var defer = Q.defer();

    state.songs_loaded = false;
    net.get_songs().then(response => {
        state.songs = response.data.songs;
        state.songs_loaded = true;

        defer.resolve();
    })

    return defer.promise;
}



function need_singers() {
    var defer = Q.defer();

    if (state.singers_loaded) {
        defer.resolve();
        return defer.promise;
    } else {
        return fetch_singers();
    }

}


function need_songs() {
    let defer = Q.defer();
    if (state.songs_loaded) {
        defer.resolve();
        return defer.promise;
    } else {
        return fetch_songs();
    }
}














// const storage = {
//     "state": {
//         "singers": [],
//         "singers_loaded": false,

//         "songs": [],
//         "songs_loaded": false,
//     },


//     fetch_singers: function () {
//         console.log("fetch singers");
//         var defer = Q.defer();

//         this.state.singers_loaded = false;
//         net.get_singers().then(response => {
//             this.state.singers = response.data.singers;
//             this.state.singers_loaded = true;

//             defer.resolve();
//         })

//         return defer.promise;
//     },


//     fetch_songs: function () {
//         console.log("fetch songs")
//         var defer = Q.defer();

//         this.state.songs_loaded = false;
//         net.get_songs().then(response => {
//             this.state.songs = response.data.songs;
//             this.state.songs_loaded = true;

//             defer.resolve();
//         })

//         return defer.promise;
//     },



//     need_singers: function(){
//         console.log("need singers");
//         var defer = Q.defer();

//         if(this.state.singers_loaded){
//             defer.resolve();
//             return defer.promise;    
//         }else{
//             return this.fetch_singers();
//         }


//     },


//     need_songs: function(){
//         console.log("need songs");
//         console.log(this);
//         let defer = Q.defer();


//         if(this.state.songs_loaded){
//             defer.resolve();
//             return defer.promise;    
//         }else{

//             console.log("123");
//             return this.fetch_songs();
//         }


//     },



// }





// export default storage;