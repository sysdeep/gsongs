import page_main from "./page_main/PageMain.vue";
// import page_main2 from "./page_main2/PageMain2.vue";
// import page_singers from "./page_singers/PageSingers.vue";
// import page_singer from "./page_singer/PageSinger.vue";
// import page_songs from "./PageSongs.vue";
// import page_song from "./page_song/PageSong.vue";
// import page_singer_edit from "./PageSingerEdit.vue";
// import page_song_edit from "./PageSongEdit.vue";
// import page_tags from "./PageTags.vue";
// import page_tag from "./PageTag.vue";
// import page_about from "./PageAbout.vue";

// import PageSpa from "./page_spa/PageSpa.vue";
// import SpaSingerFrame from "./page_spa/singer_frame/SingerFrame.vue";

// import FrameSingerSongs from "./frame_singer_songs/FrameSingerSongs.vue";
// import FrameSong from "./frame_song/FrameSong.vue";

const FrameSingerSongs = () => import("./frame_singer_songs/FrameSingerSongs.vue");
const FrameSong = () => import("./frame_song/FrameSong.vue");


export const routes = [
	// { path: '/', component: page_main },
	{ path: '/', component: {"template": `<div>main route</div>`} },
	{ path: '/singer/:singer_id', component: FrameSingerSongs, children: [
        { path: "", component: {template: "<div>null song</div>"} },
        { path: "song/:song_id", component: FrameSong },
     ] },
	// { path: '/spa', component: PageSpa},
    // // { path: '/spa', component: PageSpa , children: [
	// // 	{ path: '/singer_songs/:id', component: SpaSingerFrame },	
	// // ]},
    // { path: '/main2', component: page_main2 },
    // { path: '/singers', component: page_singers },
    // { path: '/singer/:id', component: page_singer },
    // // { path: '/singer_edit/:id', component: page_singer_edit },
    // { path: '/songs', component: page_songs },
    // { path: '/song/:id', component: page_song },
    // // { path: '/song_edit/:id', component: page_song_edit },
    // { path: '/tags', component: page_tags },
    // { path: '/tag/:id', component: page_tag },
    // { path: '/about', component: page_about },
    { path: '/*', redirect: "/" }
];


