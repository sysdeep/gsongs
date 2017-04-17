#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import time
from shutil import make_archive
from zipfile import ZipFile

from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session, send_file

from . import storage, VERSION






def get_tags():

	tags = storage.Tag.select().dicts()
	data = []
	for tag in tags:
		tag["created"] = str(tag["created"])
		tag["updated"] = str(tag["updated"])
		data.append(tag)
	return jsonify(tags=data)


def create_tag():
	in_data = request.get_json()
	tag = storage.Tag.create(name=in_data["name"])
	
	result = {"created": 1}
	return jsonify(tag=result)




def update_tag():
	in_data = request.get_json()

	tag = storage.Tag.get(storage.Tag.id == in_data["id"])
	tag.name = in_data["name"]
	tag.updated = storage.sql_date()
	tag.save()

	in_data["updated"] = str(tag.updated)

	return jsonify(tag=in_data)




def remove_tag():
	
	in_data = request.get_json()

	tag = storage.Tag.get(storage.Tag.id == in_data["id"])
	tag.delete_instance()

	return jsonify(tag=in_data)










#--- song tags ----------------------------------------------------------------
def add_song_tag():
	in_data = request.get_json()

	storage.RTagSong.create(id_song=in_data["song_id"], id_tag=in_data["tag_id"])

	return jsonify(result=in_data)


def remove_song_tag():
	in_data = request.get_json()

	record = storage.RTagSong.get(id_song=in_data["song_id"], id_tag=in_data["tag_id"])
	record.delete_instance()

	return jsonify(result=in_data)


def get_song_tags(song_id):

	result = []
	for row in storage.RTagSong.select().where(storage.RTagSong.id_song == song_id):
		result.append(row.id_tag)


	return jsonify(result=result)
#--- song tags ----------------------------------------------------------------


#--- tag songs ----------------------------------------------------------------
def get_tag_songs(tag_id):

	result = []
	for row in storage.RTagSong.select().where(storage.RTagSong.id_tag == tag_id):
		result.append(row.id_song)

	return jsonify(result=result)
#--- tag songs ----------------------------------------------------------------