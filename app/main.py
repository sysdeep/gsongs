#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from . import VERSION, storage, ctrl_service, ctrl_todo, ctrl_db, ctrl_chords, ctrl_tags, ctrl_main, ctrl_singers, ctrl_songs




app = Flask(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/asfdddfO'







#--- routes -------------------------------------------------------------------

app.add_url_rule("/", 						view_func=ctrl_main.index)
app.add_url_rule("/angular", 				view_func=ctrl_main.old_angular)
app.add_url_rule("/login", 					view_func=ctrl_main.login)
app.add_url_rule("/login", 					view_func=ctrl_main.login_post, methods=["POST"])
app.add_url_rule("/logout", 				view_func=ctrl_main.logout)
app.add_url_rule("/about", 					view_func=ctrl_main.about)
app.add_url_rule("/chords", 				view_func=ctrl_main.chords_page111)


#--- singers
app.add_url_rule("/get_singers",						view_func=ctrl_singers.get_singers)
app.add_url_rule("/create_singer",						view_func=ctrl_singers.create_singer, methods=["POST"])
app.add_url_rule("/update_singer",						view_func=ctrl_singers.update_singer, methods=["POST"])
app.add_url_rule("/remove_singer",						view_func=ctrl_singers.remove_singer, methods=["POST"])


#--- songs
app.add_url_rule("/get_songs",						view_func=ctrl_songs.get_songs)
app.add_url_rule("/create_song",					view_func=ctrl_songs.create_song, methods=["POST"])
app.add_url_rule("/update_song",					view_func=ctrl_songs.update_song, methods=["POST"])
app.add_url_rule("/remove_song",					view_func=ctrl_songs.remove_song, methods=["POST"])



#--- tags
app.add_url_rule("/get_tags", 				view_func=ctrl_tags.get_tags)
app.add_url_rule("/create_tag",				view_func=ctrl_tags.create_tag, methods=["POST"])
app.add_url_rule("/update_tag",				view_func=ctrl_tags.update_tag, methods=["POST"])
app.add_url_rule("/remove_tag",				view_func=ctrl_tags.remove_tag, methods=["POST"])


#--- song tags
app.add_url_rule("/get_song_tags/<song_id>",	view_func=ctrl_tags.get_song_tags)
app.add_url_rule("/add_song_tag",				view_func=ctrl_tags.add_song_tag, methods=["POST"])
app.add_url_rule("/remove_song_tag",			view_func=ctrl_tags.remove_song_tag, methods=["POST"])

app.add_url_rule("/get_tag_songs/<tag_id>",	view_func=ctrl_tags.get_tag_songs)
app.add_url_rule("/get_tags_songs",			view_func=ctrl_tags.get_tags_songs)


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



app.add_url_rule("/api/chords_all", 					view_func=ctrl_chords.get_chords)
app.add_url_rule("/api/chords_group/<group_id>", 		view_func=ctrl_chords.get_chords_for_group)
app.add_url_rule("/api/chord_groups", 					view_func=ctrl_chords.get_chord_groups)
app.add_url_rule("/api/chord_variants/<chord_id>", 		view_func=ctrl_chords.get_chord_variants)
#--- routes -------------------------------------------------------------------

