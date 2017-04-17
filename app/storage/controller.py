#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto
import peewee
import os.path
import time

from .loader import db, DB_FILE
from .models import *






def init_db():
	if not os.path.exists(DB_FILE):
		print("файл базы данных не найден - создаём: {}".format(DB_FILE))
		db.create_tables([Singer, Song])

	#--- auto migrations
	if not Todo.table_exists():
		Todo.create_table()

	if not Tag.table_exists():
		Tag.create_table()

	if not RTagSong.table_exists():
		RTagSong.create_table()

	

	# if not Category.table_exists():
	# 	Category.create_table()
















def close():
	db.close()


def open():
	db.connect()