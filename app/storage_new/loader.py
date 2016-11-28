#!/usr/bin/env python
# -*- coding: utf-8 -*-



from vendor import auto
import peewee
import os.path
import time




SELF_DIR 	= os.path.dirname(os.path.abspath(__file__))
DIR_UP1 	= os.path.dirname(SELF_DIR)
DIR_UP2 	= os.path.dirname(DIR_UP1)
DIR_UP3 	= os.path.dirname(DIR_UP2)

DB_FILE 		= os.path.join(DIR_UP3, "storage.db")


db = peewee.SqliteDatabase(DB_FILE)


