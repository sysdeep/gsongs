#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
	convert file chords to chords.json
"""


import json



BASE = {}

with open("chords", "r") as fd:
	text_array = fd.readlines()




# def get_main_group(line):
# 	test_maj = False
# 	if len(line) > 2:
# 		test_maj = line[2] == "#"
#
# 	if test_maj:
# 		ch = line[1:3]
# 	else:
# 		ch = line[1]
#
# 	return ch

#
# def push_main_group(group):
# 	if group not in BASE:
# 		BASE[group] = {}
#



def get_ch_name(line):
	return line[1:-2]


# def push_ch_into_group(group, ch):
# 	BASE[group][ch] = []

def push_ch(ch_name):
	BASE[ch_name] = []

def push_variant(ch_name, body):
	BASE[ch_name].append(body)


# main_group = ""
ch_name = ""
for line in text_array:
	if line.startswith("["):

		# main_group = get_main_group(line)
		# push_main_group(main_group)

		ch_name = get_ch_name(line)
		# print(ch_name)
		push_ch(ch_name)
		# push_ch_into_group(main_group, ch_name)

	else:
		push_variant(ch_name, line.strip("\n"))


#
#
json_data = json.dumps(BASE, sort_keys=True, indent=4)
#
print(json_data)
#
with open("chords.json", "w", encoding="utf-8") as fd:
	fd.write(json_data)
