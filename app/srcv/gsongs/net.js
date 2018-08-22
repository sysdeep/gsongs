import axios from "axios";



const net_factory =  {
    get_singers: function(){
        console.log("net get_singers - depricated");
        return axios.get("/api/get_singers");
    },

    get_songs: function(){
        return axios.get("/api/get_songs");
    },


    update_singer: function(idata){
        return axios.post("/update_singer", idata);
    },

    create_singer: function(idata){
        return axios.post("/create_singer", idata);
    },


    remove_singer: function(idata){
        return axios.post("/remove_singer", idata);
    },




    update_song: function(idata){
        return axios.post("/update_song", idata);
    },

    create_song: function(idata){
        return axios.post("/create_song", idata);
    },


    remove_song: function(idata){
        return axios.post("/remove_song", idata);
    },


    get_tags: function(){
        return axios.get("/api/get_tags");
    },

    update_tag: function(idata){
        return axios.post("/update_tag", idata);
    },

    create_tag: function(idata){
        return axios.post("/create_tag", idata);
    },

    remove_tag: function(idata){
        return axios.post("/remove_tag", idata);
    },


    get_tag_songs: function(tag_id){
        return axios.get("/get_tag_songs/" + tag_id);
    },


    get_song_tags: function(song_id){
        return axios.get("/get_song_tags/" + song_id);
    },




    add_song_tag: function(song_id, tag_id){
        let send_data = {
            "song_id" 	: song_id,
            "tag_id" 	: tag_id
        }
        return axios.post("/add_song_tag", send_data);
    },


    remove_song_tag: function(song_id, tag_id){
        let send_data = {
            "song_id" 	: song_id,
            "tag_id" 	: tag_id
        }
        return axios.post("/remove_song_tag", send_data);
    },



    get_tags_songs: function(){
        return axios.get("/api/get_tags_songs");
    }
}





export default net_factory;