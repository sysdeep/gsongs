import axios from "axios";


export function get_groups(){
    return axios.get("/api/chord_groups");
}


export function get_chords_group(group_id){
    return axios.get("/api/chords_group/" + group_id);
}

export function get_variants(chord_id){
    return axios.get("/api/chord_variants/" + chord_id);
}



// export function add_item(item){
//     return axios.post("/service/todo_add", item);
// }

// export function update_item(item){
//     return axios.post("/service/todo_update", item);
// }

// export function remove_item(item){
//     return axios.post("/service/todo_remove", item);
// }