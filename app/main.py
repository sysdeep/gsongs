#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto

from flask import Flask, render_template, request, redirect, url_for, jsonify

from . import storage
import json

app = Flask(__name__)
VERSION = "0.0.1"






#--- main ---------------------------------------------------------------------
@app.route("/")
def index():
	# return("Hello World!")
	data = {
		"VERSION": VERSION
	}
	return render_template("index.html", **data)

@app.route("/about")
def about():
	# return("Hello World!")
	return render_template("about.html")
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

	singer = storage.Singer(name=in_data["name"])
	singer.save()

	return jsonify(singer=in_data)


@app.route("/update_singer", methods=["POST"])
def update_singer():

	
	in_data = request.get_json()

	singer = storage.Singer.get(storage.Singer.id == in_data["id"])
	singer.name = in_data["name"]
	singer.updated = storage.sql_date()
	singer.save()

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

	# print("----->", song.id)

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




