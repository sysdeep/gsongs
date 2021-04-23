import { axios } from "./resource";


function get_songs(){
    return axios.get("/api/get_songs").then(response => response.data);
}

function get_filtered_songs(search_term){
    return axios.get("/api/get_filtered_songs?search_term=" + search_term).then(response => response.data);
}



export default {
    get_songs,
    get_filtered_songs,
}