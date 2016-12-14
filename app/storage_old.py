#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto
import peewee
import os.path
import time




SELF_DIR 	= os.path.dirname(os.path.abspath(__file__))
DIR_UP1 	= os.path.dirname(SELF_DIR)
STORAGE_DIR 	= os.path.dirname(DIR_UP1)

DB_FILE 		= os.path.join(STORAGE_DIR, "storage.db")


db = peewee.SqliteDatabase(DB_FILE)


def sql_date():
	return time.strftime( "%Y-%m-%d %H:%M:%S" )


class Base(peewee.Model):
	class Meta:
		database = db





class Singer(Base):
	id 		= peewee.IntegerField(db_column='id', primary_key=True)
	name 	= peewee.CharField(db_column='name')
	created	= peewee.DateTimeField(db_column='created', default=sql_date)
	updated	= peewee.DateTimeField(db_column='updated', default=sql_date)

	class Meta:
		db_table = 'singers'



class Song(Base):
	id 		= peewee.IntegerField(db_column='id', primary_key=True)
	singer 	= peewee.ForeignKeyField(db_column='singer_id', rel_model=Singer, to_field='id')
	name 	= peewee.CharField(db_column='name')
	author 	= peewee.CharField(db_column='author', null=True)
	album 	= peewee.CharField(db_column='album', null=True)
	text 	= peewee.CharField(db_column='text', null=True)
	description 	= peewee.CharField(db_column='description', null=True)
	genre 	= peewee.CharField(db_column='genre', null=True)
	created	= peewee.DateTimeField(db_column='created', default=sql_date)
	updated	= peewee.DateTimeField(db_column='updated', default=sql_date)

	class Meta:
		db_table = 'songs'






class Todo(Base):
	id 				= peewee.IntegerField(db_column='id', primary_key=True)
	title			= peewee.CharField(db_column='title')
	description 	= peewee.CharField(db_column='description', null=True)
	created			= peewee.DateTimeField(db_column='created', default=sql_date)
	updated			= peewee.DateTimeField(db_column='updated', default=sql_date)
	status			= peewee.IntegerField(db_column='status')						# статус - новое, завершено,...
	priority		= peewee.IntegerField(db_column='priority')						# приоритет - выжно, не очень,...

	class Meta:
		db_table = 'todos'










if not os.path.exists(DB_FILE):
	print("файл базы данных не найден - создаём: {}".format(DB_FILE))
	db.create_tables([Singer, Song])





#--- auto migrations
if not Todo.table_exists():
	Todo.create_table()


# if not PlcErr.table_exists():
# 	PlcErr.create_table()



def close():
	db.close()


def open():
	db.connect()


if __name__ == "__main__":
	
	print("main")



	# PlcErr.create_table()