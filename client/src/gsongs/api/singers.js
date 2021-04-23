import { axios } from "./resource";


function get_singers(){
    return axios.get("/api/get_singers").then(response => response.data);
}

export default {
    get_singers,
}