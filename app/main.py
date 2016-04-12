#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto
from flask import Flask, render_template


app = Flask(__name__)



@app.route("/")
def index():
	# return("Hello World!")
	return render_template("index.html")




@app.route("/about")
def about():
	# return("Hello World!")
	return render_template("about.html")






# def create_app():
# 	app = Flask(__name__)

# 	@app.route("/")
# 	def hello():
#     	return("Hello World!")


# 	return app