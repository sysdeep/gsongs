#!/usr/bin/env python
# -*- coding: utf-8 -*-

from app import storage




def get_singers():
	singers = storage.Singer.select().dicts()
	for singer in singers:
		print(singer)





if __name__ == '__main__':
	get_singers()