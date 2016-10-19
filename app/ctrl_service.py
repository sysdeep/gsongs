#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from . import storage

def service_page():
	return render_template("service/main.html")

def todo_page():
	return render_template("service/todo.html")





def todo_json_get():
	items = storage.Todo.select()
	
	data = []
	for item in items:
		row = {
			"id"			: item.id,
			"title"			: item.title,
			"description"	: item.description,
			"created"		: str(item.created),
			"updated"		: str(item.updated),
			"status"		: item.status,
			"priority"		: item.priority
		}
		data.append(row)


	return jsonify(items=data)


def todo_json_add():

	in_data = request.get_json()
	totdo = storage.Todo.create(
		title=in_data["title"],
		description=in_data["description"],
		status=in_data["status"],
		priority=in_data["priority"]
	)
	last_record = storage.Todo.select().order_by(storage.Todo.id.desc()).get()

	in_data["id"] = last_record.id
	in_data["created"] = str(last_record.created)
	in_data["updated"] = str(last_record.updated)
	return jsonify(item=in_data)


def todo_json_update():

	in_data = request.get_json()


	item = storage.Todo.get(storage.Todo.id == in_data["id"])
	item.title 			= in_data["title"]
	item.description 	= in_data["description"]
	item.status 		= in_data["status"]
	item.priority 		= in_data["priority"]
	item.updated 		= storage.sql_date()
	item.save()

	in_data["updated"] = str(item.updated)

	return jsonify(item=in_data)


def todo_json_remove():

	in_data = request.get_json()

	item = storage.Todo.get(storage.Todo.id == in_data["id"])
	item.delete_instance()

	return jsonify(item=in_data)


