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
		return redirect(url_for('index'))
		


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