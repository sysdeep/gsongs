import axios from "axios";



const net_factory =  {
    get_singers: function(){
        return axios.get("/get_singers");
    },

    get_songs: function(){
        return axios.get("/get_songs");
    }
}





export default net_factory;