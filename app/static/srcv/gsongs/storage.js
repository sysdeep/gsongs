import net from "./net";

const storage = {
    "state": {
        "singers": [],
        "singers_loaded": false,

        "songs": [],
        "songs_loaded": false,
    },


    fetch_singers: function () {
        this.state.singers_loaded = false;
        net.get_singers().then(response => {
            this.state.singers = response.data.singers;
            this.state.singers_loaded = true;
        })
    },


    fetch_songs: function () {
        this.state.songs_loaded = false;
        net.get_songs().then(response => {
            this.state.songs = response.data.songs;
            this.state.songs_loaded = true;
        })
    }
}





export default storage;