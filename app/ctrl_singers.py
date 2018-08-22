#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from . import storage, VERSION



def get_singers():
	singers = storage.Singer.select(storage.Singer.id, storage.Singer.name).dicts()
	# data = []
	# for singer in singers:
	# 	singer["created"] = str(singer["created"])
	# 	singer["updated"] = str(singer["updated"])
	# 	data.append(singer)
	# return jsonify(singers=data)
	return jsonify(singers=list(singers))
	

def get_singer(singer_id):
	singer = storage.Singer.get(storage.Singer.id == singer_id)
	response = {
		"id"		: singer.id,
		"name"		: singer.name,
		"created"	: str(singer.created),
		"updated"	: str(singer.updated),
	}
	# data = []
	# for singer in singers:
	# 	singer["created"] = str(singer["created"])
	# 	singer["updated"] = str(singer["updated"])
	# 	data.append(singer)
	# return jsonify(singers=data)
	# print(singer)
	return jsonify(singer=response)



def create_singer():
	in_data = request.get_json()
	singer = storage.Singer.create(name=in_data["name"])
	last_singer = storage.Singer.select().order_by(storage.Singer.id.desc()).get()

	in_data["id"] = last_singer.id
	in_data["created"] = str(last_singer.created)
	in_data["updated"] = str(last_singer.updated)
	return jsonify(singer=in_data)






def update_singer():
	in_data = request.get_json()

	singer = storage.Singer.get(storage.Singer.id == in_data["id"])
	singer.name = in_data["name"]
	singer.updated = storage.sql_date()
	singer.save()

	in_data["updated"] = str(singer.updated)

	return jsonify(singer=in_data)







def remove_singer():
	
	in_data = request.get_json()

	singer = storage.Singer.get(storage.Singer.id == in_data["id"])
	singer.delete_instance()

	return jsonify(singer=in_data)


