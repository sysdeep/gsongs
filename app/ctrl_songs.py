from flask import request, jsonify

from . import storage


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


def get_filtered_songs():
    """запрос песен по фильтру"""

    search_term = request.args.get("search_term")  # поиск по имени

    if (search_term is None) or (len(search_term) == 0):
        return jsonify(songs=list())

    songs = storage.Song.select(storage.Song.id, storage.Song.name, storage.Song.singer) \
        .where(storage.Song.name.contains(search_term)) \
        .dicts()

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
        "id": song.id,
        "singer": song.singer.id,
        "name": song.name,
        "author": song.author,
        "album": song.album,
        "text": song.text,
        "description": song.description,
        "genre": song.genre,
        "created": str(song.created),
        "updated": str(song.updated),
    }

    singer_songs = storage.Song.select(storage.Song.id, storage.Song.name).where(storage.Song.singer == song.singer.id).dicts()

    song_tag_links = storage.RTagSong.select().where(storage.RTagSong.id_song == song_id).dicts()

    res = {"song": response, "singer_songs": list(singer_songs), "tag_links": list(song_tag_links)}

    # return jsonify(song=response)
    return jsonify(res)


def create_song():

    in_data = request.get_json()

    if in_data is None:
        raise Exception('no input data')

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

    if in_data is None:
        raise Exception('no input data')

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
    except Exception:
        song = None
        return jsonify(song="")


def remove_song():

    in_data = request.get_json()

    if in_data is None:
        raise Exception('no input data')

    song = storage.Song.get(storage.Song.id == in_data["id"])
    song.delete_instance()

    return jsonify(song=in_data)
