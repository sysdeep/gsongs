import axios from "axios";



const net_factory =  {
    get_singers: function(){
        return axios.get("/get_singers");
    },

    get_songs: function(){
        return axios.get("/get_songs");
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
    }
}





export default net_factory;