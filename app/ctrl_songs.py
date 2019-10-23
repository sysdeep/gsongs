#!/usr/bin/env python
# -*- coding: utf-8 -*-

# from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from . import storage, VERSION





def get_songs():
	songs = storage.Song.select(storage.Song.id, storage.Song.name, storage.Song.singer).dicts()
	# songs = storage.Song.select().dicts()
	# data = []
	# for song in songs:
	# 	song["created"] = str(song["created"])
	# 	song["updated"] = str(song["updated"])
	# 	data.append(song)
	# return jsonify(songs=data)
	return jsonify(songs=list(songs))

def get_song(song_id):
	song = storage.Song.get(storage.Song.id == song_id)
	response = {
		"id"			: song.id,
		"singer"		: song.singer.id,
		"name"			: song.name,
		"author"		: song.author,
		"album"			: song.album,
		"text"			: song.text,
		"description"	: song.description,
		"genre"			: song.genre,
		"created"		: str(song.created),
		"updated"		: str(song.updated),
	}

	return jsonify(song=response)


def create_song():
	
	in_data = request.get_json()

	song = storage.Song()
	song.singer = in_data["singer"]
	song.name = in_data["name"]
	song.author = in_data["author"]
	song.album = in_data["album"]
	song.text = in_data["text"]
	song.description = in_data["description"]
	song.genre = in_data["genre"]
	song.save()

	last_song = storage.Song.select().order_by(storage.Song.id.desc()).get()
	in_data["id"] = last_song.id
	in_data["created"] = str(last_song.created)
	in_data["updated"] = str(last_song.updated)

	return jsonify(song=in_data)




def update_song():
	
	in_data = request.get_json()

	try:
		song = storage.Song.get(storage.Song.id == in_data["id"])
		song.singer = in_data["singer"]
		song.name = in_data["name"]
		song.author = in_data["author"]
		song.album = in_data["album"]
		song.text = in_data["text"]
		song.description = in_data["description"]
		song.genre = in_data["genre"]
		song.save()
		in_data["updated"] = str(song.updated)
		return jsonify(song=in_data)
	except:
		song = None
		return jsonify(song="")

		

def remove_song():
	
	in_data = request.get_json()

	song = storage.Song.get(storage.Song.id == in_data["id"])
	song.delete_instance()

	return jsonify(song=in_data)




