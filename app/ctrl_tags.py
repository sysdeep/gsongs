#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import time
from shutil import make_archive
from zipfile import ZipFile

# from vendor import auto
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





def get_tags_songs():

	tags = storage.RTagSong.select().dicts()
	data = []
	for tag in tags:
		tag["created"] = str(tag["created"])
		tag["updated"] = str(tag["updated"])
		data.append(tag)
	return jsonify(result=data)




def get_tag_songs(tag_id):

	links = storage.RTagSong.select(storage.RTagSong.id_song).where(storage.RTagSong.id_tag == tag_id)

	song_ids = [v.id_song for v in links]
	songs = storage.Song.select(storage.Song.id, storage.Song.name, storage.Song.singer).where(storage.Song.id.in_(song_ids)).dicts()

	res = {
		"songs"	: list(songs)
	}
	return jsonify(res)




#--- song tags ----------------------------------------------------------------
def add_song_tag():
	in_data = request.get_json()

	storage.RTagSong.create(id_song=in_data["song_id"], id_tag=in_data["tag_id"])

	song_tag_links = storage.RTagSong.select().where(storage.RTagSong.id_song == in_data["song_id"]).dicts()

	res = {
		"song_tag_links"			: list(song_tag_links)
	}


	return jsonify(res)
	# return jsonify(result=in_data)


def remove_song_tag():
	in_data = request.get_json()

	record = storage.RTagSong.get(id_song=in_data["song_id"], id_tag=in_data["tag_id"])
	record.delete_instance()

	song_tag_links = storage.RTagSong.select().where(storage.RTagSong.id_song == in_data["song_id"]).dicts()

	res = {
		"song_tag_links"			: list(song_tag_links)
	}


	return jsonify(res)

	# return jsonify(result=in_data)


# def get_song_tags(song_id):

# 	result = []
# 	for row in storage.RTagSong.select().where(storage.RTagSong.id_song == song_id):
# 		# print(row.id_tag)
# 		result.append(row.id_tag.id)


# 	return jsonify(result=result)
#--- song tags ----------------------------------------------------------------


#--- tag songs ----------------------------------------------------------------
# def get_tag_songs(tag_id):






# 	songs_ids = []

# 	# try:
# 	# 	items = storage.RTagSong.select().where(storage.RTagSong.id_tag == tag_id)
# 	# except:
# 	# 	items = []

# 	for row in storage.RTagSong.select().where(storage.RTagSong.id_tag == tag_id):
# 	# for row in items:
# 		# print("--->", row)
# 		songs_ids.append(row.id_song.id)

# 	# print(songs_ids)
# 	# # for song in storage.Song.select().where(storage.Song.id in songs_ids):
# 	# for song in storage.Song.select().where(storage.Song.id << songs_ids).join(storage.Singer):
# 	# 	print(song.name)
# 	# 	print(dir(song))


# 	result = songs_ids
# 	return jsonify(result=result)
#--- tag songs ----------------------------------------------------------------