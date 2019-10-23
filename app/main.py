#!/usr/bin/env python
# -*- coding: utf-8 -*-

# from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from . import VERSION, storage, ctrl_service, ctrl_todo, ctrl_db, ctrl_chords, ctrl_tags, ctrl_main, ctrl_singers, ctrl_songs




app = Flask(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/asfdddfO'







#--- routes -------------------------------------------------------------------

#-- index
app.add_url_rule("/", 						view_func=ctrl_main.index)

#-- auth
app.add_url_rule("/login", 					view_func=ctrl_main.login)
app.add_url_rule("/login", 					view_func=ctrl_main.login_post, methods=["POST"])
app.add_url_rule("/logout", 				view_func=ctrl_main.logout)


#-- gsongs SPA
app.add_url_rule("/app",					view_func=ctrl_main.app)
app.add_url_rule("/app/",					view_func=ctrl_main.app)
app.add_url_rule("/app/<path:path>",		view_func=ctrl_main.app)



# app.add_url_rule("/api/preload_data",					view_func=ctrl_main.preload_gsongs_data)


#--- singers
app.add_url_rule("/api/get_singers",					view_func=ctrl_singers.get_singers)
app.add_url_rule("/api/get_singer/<singer_id>",			view_func=ctrl_singers.get_singer)
app.add_url_rule("/api/create_singer",					view_func=ctrl_singers.create_singer, methods=["POST"])
app.add_url_rule("/api/update_singer",					view_func=ctrl_singers.update_singer, methods=["POST"])
app.add_url_rule("/api/remove_singer",					view_func=ctrl_singers.remove_singer, methods=["POST"])


#--- songs
app.add_url_rule("/api/get_songs",						view_func=ctrl_songs.get_songs)
app.add_url_rule("/api/get_song/<song_id>",				view_func=ctrl_songs.get_song)
app.add_url_rule("/api/create_song",					view_func=ctrl_songs.create_song, methods=["POST"])
app.add_url_rule("/api/update_song",					view_func=ctrl_songs.update_song, methods=["POST"])
app.add_url_rule("/api/remove_song",					view_func=ctrl_songs.remove_song, methods=["POST"])



#--- tags
app.add_url_rule("/api/get_tags", 						view_func=ctrl_tags.get_tags)
app.add_url_rule("/api/create_tag",						view_func=ctrl_tags.create_tag, methods=["POST"])
app.add_url_rule("/api/update_tag",						view_func=ctrl_tags.update_tag, methods=["POST"])
app.add_url_rule("/api/remove_tag",						view_func=ctrl_tags.remove_tag, methods=["POST"])


#--- song tags
app.add_url_rule("/api/get_tags_songs",					view_func=ctrl_tags.get_tags_songs)
# app.add_url_rule("/get_song_tags/<song_id>",			view_func=ctrl_tags.get_song_tags)
# app.add_url_rule("/get_tag_songs/<tag_id>",				view_func=ctrl_tags.get_tag_songs)
app.add_url_rule("/api/add_song_tag",					view_func=ctrl_tags.add_song_tag, methods=["POST"])
app.add_url_rule("/api/remove_song_tag",				view_func=ctrl_tags.remove_song_tag, methods=["POST"])












#--- service
app.add_url_rule("/service", 				view_func=ctrl_service.service_page)

#--- todo
app.add_url_rule("/service/todo", 			view_func=ctrl_todo.todo_page)
app.add_url_rule("/service/todo_get", 		view_func=ctrl_todo.todo_json_get)
app.add_url_rule("/service/todo_add", 		view_func=ctrl_todo.todo_json_add, 		methods=["POST"])
app.add_url_rule("/service/todo_update", 	view_func=ctrl_todo.todo_json_update, 	methods=["POST"])
app.add_url_rule("/service/todo_remove", 	view_func=ctrl_todo.todo_json_remove, 	methods=["POST"])


#--- db
app.add_url_rule("/service/db", 						view_func=ctrl_db.db_page)
app.add_url_rule("/service/db_backup", 					view_func=ctrl_db.db_backup)
app.add_url_rule("/service/db_download/<file_name>", 	view_func=ctrl_db.db_download)
app.add_url_rule("/service/db_remove/<file_name>", 		view_func=ctrl_db.db_remove)




#--- chords
app.add_url_rule("/service/chords",						view_func=ctrl_chords.chords_page)
app.add_url_rule("/chords", 				view_func=ctrl_main.chords_page111)


app.add_url_rule("/api/chords_all", 					view_func=ctrl_chords.get_chords)
app.add_url_rule("/api/chords_group/<group_id>", 		view_func=ctrl_chords.get_chords_for_group)
app.add_url_rule("/api/chord_groups", 					view_func=ctrl_chords.get_chord_groups)
app.add_url_rule("/api/chord_variants/<chord_id>", 		view_func=ctrl_chords.get_chord_variants)





app.add_url_rule("/api/releases", 		view_func=ctrl_main.releases_json)
#--- routes -------------------------------------------------------------------

