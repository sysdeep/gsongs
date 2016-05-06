#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto

from flask import Flask, render_template, request, redirect, url_for, jsonify

from . import storage
import json

app = Flask(__name__)
VERSION = "0.0.1"


@app.route("/")
def index():
	# return("Hello World!")
	data = {
		"singers": storage.Singer.select(),
		"VERSION": VERSION
	}
	return render_template("index.html", **data)










@app.route("/get_singers")
def get_singers():
	singers = storage.Singer.select().dicts()
	data = []
	for singer in singers:
		data.append(singer)
	return jsonify(singers=data)









@app.route("/create_singer", methods=["POST"])
def create_singer():

	
	in_data = request.get_json()

	singer = storage.Singer(name=in_data["name"])
	singer.save()



	# print(singer.id)
	# print(singer.name)
	# in_data["id"] = singer.id


	return jsonify(singer=in_data)




@app.route("/remove_singer", methods=["POST"])
def remove_singer():

	
	in_data = request.get_json()

	singer = storage.Singer.get(storage.Singer.id == in_data["id"])
	singer.delete_instance()

	return jsonify(singer=in_data)


@app.route("/update_singer", methods=["POST"])
def update_singer():

	
	in_data = request.get_json()

	singer = storage.Singer.get(storage.Singer.id == in_data["id"])
	singer.name = in_data["name"]
	singer.save()

	return jsonify(singer=in_data)









@app.route("/get_songs")
def get_songs():
	songs = storage.Song.select().dicts()
	data = []
	for song in songs:
		data.append(song)
	return jsonify(songs=data)















@app.route("/singers")
def singers():
	data = {
		"singers": storage.Singer.select()
	}
	return render_template("singers.html", **data)	



@app.route("/singer/<int:singer_id>")
def singer(singer_id):

	singer = storage.Singer.get(storage.Singer.id==singer_id)
	data = {
		"singer": singer
	}
	return render_template("singer.html", **data)	


@app.route("/singer_update", methods=["POST"])
def singer_update():

	singer_id = request.form["id"]
	singer_name = request.form["name"]

	singer = storage.Singer.get(storage.Singer.id==singer_id)
	singer.name = singer_name
	singer.save()
	# return redirect(url_for('singer/'+str(singer_id)))
	return redirect('/singer/'+str(singer_id))



@app.route("/songs")
def songs():
	data = {
		"songs": storage.Song.select()
	}
	return render_template("songs.html", **data)	


@app.route("/about")
def about():
	# return("Hello World!")
	return render_template("about.html")


@app.route("/singers")
def singers():
	data = {
		"singers": storage.Singer.select()
	}
	return render_template("singers.html", **data)	


@app.route("/create_singer")
def create_singer():
	name = request.args.get('name', '')
	storage.Singer.create(name=name)
	return redirect(url_for('singers'))




@app.route("/remove_singer/<id>")
def remove_singer(id):

	# print(id)

	singer = storage.Singer.get(storage.Singer.id == id)
	singer.delete_instance()


	return redirect(url_for('singers'))





# def create_app():
# 	app = Flask(__name__)

# 	@app.route("/")
# 	def hello():
#     	return("Hello World!")


# 	return app