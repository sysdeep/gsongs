#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from . import storage, VERSION
USERNAME = "diver"
PASSWORD = "deep"



def index():
	
	if "username" not in session:
		return redirect(url_for("login"))

	# data = {
	# 	"VERSION": VERSION
	# }
	# return render_template("gsongs_vue.html", **data)
	return redirect(url_for('app'))
	


def app(path=None):
	data = {
		"VERSION": VERSION
	}
	return render_template("gsongs_vue.html", **data)


def login():
	data = {
		"VERSION": VERSION,
		"is_error": False
	}
	return render_template("login.html", **data)




def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))




def login_post():


	form_username = request.form["username"]
	form_password = request.form["password"]

	if(form_username == USERNAME and form_password == PASSWORD):
		session['username'] = form_username
		# return redirect('/')
		return redirect(url_for('app'))
		


	# print(form_username, form_password)
	# print(request.form)
	# return("Hello World!")
	data = {
		"VERSION": VERSION,
		"is_error": True
	}
	return render_template("login.html", **data)






def chords_page111():
	data = {
		"VERSION": VERSION
	}
	return render_template("chords.html", **data)





def releases_json():
	"""releases content"""
	FILE_NAME 	= "release.md"
	DIR_SELF 	= os.path.dirname(os.path.abspath(__file__))
	FILE_PATH	= os.path.normpath(os.path.join(DIR_SELF, "..", FILE_NAME))

	with open(FILE_PATH, "r", encoding="utf-8") as fd:
		rdata = fd.read()
	
	return jsonify(result=rdata)


# def preload_gsongs_data():
# 	"""загрузка всех данных"""
# 	singers = storage.Singer.select(storage.Singer.id, storage.Singer.name).dicts()
# 	songs = storage.Song.select(storage.Song.id, storage.Song.name, storage.Song.singer).dicts()


# 	all_tags_models = storage.Tag.select().dicts()
# 	all_tags = []
# 	for tag in all_tags_models:
# 		tag["created"] = str(tag["created"])
# 		tag["updated"] = str(tag["updated"])
# 		all_tags.append(tag)
	



# 	link_tags_models = storage.RTagSong.select().dicts()
# 	link_tags = []
# 	for tag in link_tags_models:
# 		tag["created"] = str(tag["created"])
# 		tag["updated"] = str(tag["updated"])
# 		link_tags.append(tag)
	

# 	result = {
# 		"singers"	: list(singers),
# 		"songs"		: list(songs),
# 		"tags"		: all_tags,
# 		"tags_links"	: link_tags
# 	}
	
# 	# return jsonify(singers=list(singers))

# 	return jsonify(result)