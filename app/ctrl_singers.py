from flask import request, jsonify

from . import storage


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
        "id": singer.id,
        "name": singer.name,
        "created": str(singer.created),
        "updated": str(singer.updated),
    }

    songs = storage.Song.select(storage.Song.id, storage.Song.name).where(storage.Song.singer == singer_id).dicts()

    res = {"singer": response, "songs": list(songs)}

    # return jsonify(singer=response)
    return jsonify(res)


def create_singer():
    in_data = request.get_json()

    if in_data is None:
        raise Exception('no input data')

    storage.Singer.create(name=in_data["name"])
    last_singer = storage.Singer.select().order_by(storage.Singer.id.desc()).get()

    in_data["id"] = last_singer.id
    in_data["created"] = str(last_singer.created)
    in_data["updated"] = str(last_singer.updated)
    return jsonify(singer=in_data)


def update_singer():
    in_data = request.get_json()

    if in_data is None:
        raise Exception('no input data')

    singer = storage.Singer.get(storage.Singer.id == in_data["id"])
    singer.name = in_data["name"]
    singer.updated = storage.sql_date()
    singer.save()

    in_data["updated"] = str(singer.updated)

    return jsonify(singer=in_data)


def remove_singer():

    in_data = request.get_json()

    if in_data is None:
        raise Exception('no input data')

    singer = storage.Singer.get(storage.Singer.id == in_data["id"])
    singer.delete_instance()

    return jsonify(singer=in_data)
