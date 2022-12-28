from flask import jsonify

from . import storage


def get_main_page_data():
    msongs = storage.Song.select().dicts()
    msingers = storage.Singer.select().dicts()
    mtags = storage.Tag.select().dicts()
    mtlinks = storage.RTagSong.select().dicts()

    # singers = []
    # for item in msingers:
    # 	item["created"]

    data = []
    # for song in songs:
    # 	song["created"] = str(song["created"])
    # 	song["updated"] = str(song["updated"])
    # 	data.append(song)
    return jsonify(songs=data)
