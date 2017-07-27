import axios from "axios";


export function get_items(){
    return axios.get("/service/todo_get");
}

export function add_item(item){
    return axios.post("/service/todo_add", item);
}

export function update_item(item){
    return axios.post("/service/todo_update", item);
}

export function remove_item(item){
    return axios.post("/service/todo_remove", item);
}