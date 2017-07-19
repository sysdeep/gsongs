import page_main from "./PageMain.vue";
import page_singers from "./PageSingers.vue";
import page_singer from "./PageSinger.vue";
import page_songs from "./PageSongs.vue";
import page_song from "./PageSong.vue";
import page_singer_edit from "./PageSingerEdit.vue";
import page_song_edit from "./PageSongEdit.vue";
import page_tags from "./PageTags.vue";
import page_tag from "./PageTag.vue";




export const routes = [
    { path: '/', component: page_main },
    { path: '/singers', component: page_singers },
    { path: '/singer/:id', component: page_singer },
    { path: '/singer_edit/:id', component: page_singer_edit },
    { path: '/songs', component: page_songs },
    { path: '/song/:id', component: page_song },
    { path: '/song_edit/:id', component: page_song_edit },
    { path: '/tags', component: page_tags },
    { path: '/tag/:id', component: page_tag },
];


