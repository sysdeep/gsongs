#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os.path
# import sqlite3


from vendor import auto
import peewee

#--- main
SELF_DIR 	= os.path.dirname(os.path.abspath(__file__))
DIR_UP1 	= os.path.dirname(SELF_DIR)
DIR_UP2 	= os.path.dirname(DIR_UP1)
DB_DIR 	    = os.path.dirname(DIR_UP2)
FILE_NAME   = "chdb.db"
DB_FILE 	= os.path.join(DB_DIR, FILE_NAME)





# def connect():
# 	connection = sqlite3.connect(DB_FILE)
# 	return connection





db = peewee.SqliteDatabase(DB_FILE)

