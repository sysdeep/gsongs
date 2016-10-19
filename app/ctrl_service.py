#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from . import storage, VERSION

def service_page():
	data = {
		"VERSION": VERSION
	}
	return render_template("service/main.html", **data)
