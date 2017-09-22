#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import sqlite3

DBFILE = "../../../chdb.db"
JSFILE = "../chords.json"


def connect():
	connection = sqlite3.connect(DBFILE)
	return connection



def get_data():
	data = {}
	with open(JSFILE, "r", encoding="utf8") as fd:
		jdata = fd.read()
		data = json.loads(jdata)
	return data


def write_groups():
	data = get_data()
	groups = sorted(list(data.keys()))
	print(groups)

	connection = connect()
	cursor = connection.cursor()
	for g in groups:
		cursor.execute("INSERT INTO groups(name) VALUES(?)", (g,))

	connection.commit()


def write_chords():
	data = get_data()
	connection = connect()
	cursor = connection.cursor()
	for group, chords in data.items():
		# print(group, "->", chords)
		
		cursor.execute("INSERT INTO groups(name) VALUES(?)", (group,))
		group_id = cursor.lastrowid


		for ch, variants in chords.items():
			print(group, "=>", ch, "->", len(variants))
			cursor.execute("INSERT INTO chords(cgroup, name, cgroup_id) VALUES(?,?,?)", (group, ch, group_id))
			ch_id = cursor.lastrowid

			for variant in variants:
				print(variant)
				cursor.execute("INSERT INTO variants(chord, chord_id, level, is_main, body) VALUES(?,?,?,?,?)", (ch, ch_id, 1, False, variant))

	connection.commit()


def main():

	#--- 1 make groups	 
	# write_groups()
	
	#--- 2 chords
	write_chords()




main()


