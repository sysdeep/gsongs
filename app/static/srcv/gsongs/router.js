import page_main from "./PageMain.vue";
import page_singers from "./PageSingers.vue";
import page_singer from "./PageSinger.vue";
import page_songs from "./PageSongs.vue";
import page_song from "./PageSong.vue";
import page_singer_edit from "./PageSingerEdit.vue";
import page_song_edit from "./PageSongEdit.vue";



const page_create_song = {template: "<p>page_create_song</p>"};
// const page_singers = {template: "<p>page_singers</p>"};
// const page_songs = {template: "<p>page_songs</p>"};
const page_tags = {template: "<p>page_tags</p>"};

export const routes = [
    { path: '/', component: page_main },
    { path: '/song_create', component: page_create_song },
    { path: '/singers', component: page_singers },
    { path: '/singer/:id', component: page_singer },
    { path: '/singer_edit/:id', component: page_singer_edit },
    { path: '/songs', component: page_songs },
    { path: '/song/:id', component: page_song },
    { path: '/song_edit/:id', component: page_song_edit },
    { path: '/tags', component: page_tags },
];


