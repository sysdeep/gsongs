#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto

from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from . import storage
import json

app = Flask(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/asfdddfO'
VERSION = "1.0.0"

USERNAME = "diver"
PASSWORD = "deep"





#--- main ---------------------------------------------------------------------
@app.route("/")
def index():
	
	if "username" not in session:
		return redirect(url_for("login"))


	data = {
		"VERSION": VERSION
	}
	return render_template("index.html", **data)

@app.route("/login")
def login():
	# return("Hello World!")
	data = {
		"VERSION": VERSION,
		"is_error": False
	}
	return render_template("login.html", **data)

@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route("/login", methods=["POST"])
def login_post():


	form_username = request.form["username"]
	form_password = request.form["password"]

	if(form_username == USERNAME and form_password == PASSWORD):
		session['username'] = form_username
		# return redirect('/')
		return redirect(url_for('index'))
		


	print(form_username, form_password)
	# print(request.form)
	# return("Hello World!")
	data = {
		"VERSION": VERSION,
		"is_error": True
	}
	return render_template("login.html", **data)

@app.route("/about")
def about():
	# return("Hello World!")
	return render_template("about.html")


@app.route("/chords")
def chords_page():

	data = {
		"VERSION": VERSION
	}
	return render_template("chords.html", **data)


@app.route("/service")
def service_page():
	# return("Hello World!")
	return render_template("service/main.html")

@app.route("/service/todo")
def service_todo_page():
	# return("Hello World!")
	return render_template("service/todo.html")

#--- main ---------------------------------------------------------------------







#--- singers ------------------------------------------------------------------
@app.route("/get_singers")
def get_singers():
	singers = storage.Singer.select().dicts()
	data = []
	for singer in singers:
		singer["created"] = str(singer["created"])
		singer["updated"] = str(singer["updated"])
		data.append(singer)
	return jsonify(singers=data)



@app.route("/create_singer", methods=["POST"])
def create_singer():
	in_data = request.get_json()
	singer = storage.Singer.create(name=in_data["name"])
	last_singer = storage.Singer.select().order_by(storage.Singer.id.desc()).get()

	in_data["id"] = last_singer.id
	in_data["created"] = str(last_singer.created)
	in_data["updated"] = str(last_singer.updated)
	return jsonify(singer=in_data)





@app.route("/update_singer", methods=["POST"])
def update_singer():
	in_data = request.get_json()

	singer = storage.Singer.get(storage.Singer.id == in_data["id"])
	singer.name = in_data["name"]
	singer.updated = storage.sql_date()
	singer.save()

	in_data["updated"] = str(singer.updated)

	return jsonify(singer=in_data)






@app.route("/remove_singer", methods=["POST"])
def remove_singer():
	
	in_data = request.get_json()

	singer = storage.Singer.get(storage.Singer.id == in_data["id"])
	singer.delete_instance()

	return jsonify(singer=in_data)
#--- singers ------------------------------------------------------------------






#--- songs --------------------------------------------------------------------

@app.route("/get_songs")
def get_songs():
	songs = storage.Song.select().dicts()
	data = []
	for song in songs:
		song["created"] = str(song["created"])
		song["updated"] = str(song["updated"])
		data.append(song)
	return jsonify(songs=data)



@app.route("/create_song", methods=["POST"])
def create_song():
	
	in_data = request.get_json()

	song = storage.Song()
	song.singer = in_data["singer"]
	song.name = in_data["name"]
	song.author = in_data["author"]
	song.album = in_data["album"]
	song.text = in_data["text"]
	song.description = in_data["description"]
	song.genre = in_data["genre"]
	song.save()

	last_song = storage.Song.select().order_by(storage.Song.id.desc()).get()
	in_data["id"] = last_song.id
	in_data["created"] = str(last_song.created)
	in_data["updated"] = str(last_song.updated)

	return jsonify(result=in_data)




@app.route("/update_song", methods=["POST"])
def update_song():
	
	in_data = request.get_json()

	try:
		song = storage.Song.get(storage.Song.id == in_data["id"])
		song.singer = in_data["singer"]
		song.name = in_data["name"]
		song.author = in_data["author"]
		song.album = in_data["album"]
		song.text = in_data["text"]
		song.description = in_data["description"]
		song.genre = in_data["genre"]
		song.save()
		in_data["updated"] = str(song.updated)
		return jsonify(result=in_data)
	except:
		song = None
		return jsonify(result="")

		


@app.route("/remove_song", methods=["POST"])
def remove_song():
	
	in_data = request.get_json()

	song = storage.Song.get(storage.Song.id == in_data["id"])
	song.delete_instance()

	return jsonify(song=in_data)
#--- songs --------------------------------------------------------------------







@app.route("/nika2016")
def nika2016():
	
	data = {
		"VERSION": VERSION
	}
	return render_template("nika2016/index.html", **data)
