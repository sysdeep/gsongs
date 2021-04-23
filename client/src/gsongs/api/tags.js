import { axios } from "./resource";


function fetch_tags() {
    return axios.get("/api/get_tags").then(response => response.data);
}



//--- UNUSED
/**
 * получить список связей тэгов и песенок
 */
function fetch_tag_song_links() {
    return axios.get("/api/get_tags_songs").then(response => response.data);
}



/**
 * создание тэга
 */
function create_tag(model) {
    return axios.post("/api/create_tag", model).then(response => response.data);
}


/**
 * обновление тэга
 */
function update_tag(model) {
    return axios.post("/api/update_tag", model).then(response => response.data);
}

/**
 * удаление тэга
 */
function remove_tag(model) {
    return axios.post("/api/remove_tag", model).then(response => response.data);
}

export default {
    fetch_tags,
    fetch_tag_song_links,
    create_tag,
    update_tag,
    remove_tag,
}