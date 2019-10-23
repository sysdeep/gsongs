#!/usr/bin/env python
# -*- coding: utf-8 -*-



# from vendor import auto
import peewee
import os.path
import time



#--- main
SELF_DIR 	= os.path.dirname(os.path.abspath(__file__))
DIR_UP1 	= os.path.dirname(SELF_DIR)
DIR_UP2 	= os.path.dirname(DIR_UP1)
DB_DIR 	    = os.path.dirname(DIR_UP2)
FILE_NAME   = "storage.db"
DB_FILE 		= os.path.join(DB_DIR, FILE_NAME)


#--- db files bacups
DIR_BACKUPS = os.path.join(DB_DIR, "backups")





db = peewee.SqliteDatabase(DB_FILE)


