#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto
from flask import Flask, render_template, request, redirect, url_for
from . import storage

app = Flask(__name__)



@app.route("/")
def index():
	# return("Hello World!")
	data = {
		"singers": storage.Singer.select()
	}
	return render_template("index.html", **data)




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