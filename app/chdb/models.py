#!/usr/bin/env python
# -*- coding: utf-8 -*-

# from vendor import auto
import peewee
import os.path
import time

from .loader import db



# def sql_date():
# 	return time.strftime( "%Y-%m-%d %H:%M:%S" )


class Base(peewee.Model):
	class Meta:
		database = db





class Group(Base):
	id 		= peewee.IntegerField(db_column='id', primary_key=True)
	name 	= peewee.CharField(db_column='name')
	description	= peewee.TextField(db_column="description")

	class Meta:
		db_table = 'groups'





class Chord(Base):
	id 			= peewee.IntegerField(db_column='id', primary_key=True)
	name 		= peewee.CharField(db_column='name')
	sname 		= peewee.CharField(db_column='sname')
	cgroup 		= peewee.CharField(db_column='cgroup')
	cgroup_id	= peewee.IntegerField(db_column='cgroup_id')
	description	= peewee.TextField(db_column="description")

	class Meta:
		db_table = 'chords'





class Variant(Base):
	id 			= peewee.IntegerField(db_column='id', primary_key=True)
	chord 		= peewee.CharField(db_column='chord')
	chord_id 	= peewee.IntegerField(db_column='chord_id')
	level 		= peewee.IntegerField(db_column='level')
	is_main		= peewee.BooleanField(db_column='is_main')
	body		= peewee.CharField(db_column='body')
	description	= peewee.TextField(db_column="description")

	class Meta:
		db_table = 'variants'





# class Song(Base):
# 	id 		= peewee.IntegerField(db_column='id', primary_key=True)
# 	singer 	= peewee.ForeignKeyField(db_column='singer_id', rel_model=Singer, to_field='id')
# 	name 	= peewee.CharField(db_column='name')
# 	author 	= peewee.CharField(db_column='author', null=True)
# 	album 	= peewee.CharField(db_column='album', null=True)
# 	text 	= peewee.CharField(db_column='text', null=True)
# 	description 	= peewee.CharField(db_column='description', null=True)
# 	genre 	= peewee.CharField(db_column='genre', null=True)
# 	created	= peewee.DateTimeField(db_column='created', default=sql_date)
# 	updated	= peewee.DateTimeField(db_column='updated', default=sql_date)

# 	class Meta:
# 		db_table = 'songs'


# # class Category(Base):
# # 	id 		= peewee.IntegerField(db_column='id', primary_key=True)
# # 	name 	= peewee.CharField(db_column='name')


# # 	class Meta:
# # 		db_table = "categoryes"


# class Tag(Base):
# 	id 				= peewee.IntegerField(db_column='id', primary_key=True)
# 	name 			= peewee.CharField(db_column='name')
# 	created			= peewee.DateTimeField(db_column='created', default=sql_date)
# 	updated			= peewee.DateTimeField(db_column='updated', default=sql_date)


# 	class Meta:
# 		db_table = "tags"



# # class RTagSong(Base):
# # 	id 				= peewee.IntegerField(db_column='id', primary_key=True)
# # 	id_tag			= peewee.IntegerField(db_column='id_tag')
# # 	id_song			= peewee.IntegerField(db_column='id_song')
# # 	created			= peewee.DateTimeField(db_column='created', default=sql_date)
# # 	updated			= peewee.DateTimeField(db_column='updated', default=sql_date)


# # 	class Meta:
# # 		db_table = "rtagsong"



# class RTagSong(Base):
# 	id 				= peewee.IntegerField(db_column='id', primary_key=True)
# 	id_tag			= peewee.ForeignKeyField(Tag, db_column='id_tag')
# 	id_song			= peewee.ForeignKeyField(Song, db_column='id_song')
# 	created			= peewee.DateTimeField(db_column='created', default=sql_date)
# 	updated			= peewee.DateTimeField(db_column='updated', default=sql_date)


# 	class Meta:
# 		db_table = "rtagsong"



# class Todo(Base):
# 	id 				= peewee.IntegerField(db_column='id', primary_key=True)
# 	title			= peewee.CharField(db_column='title')
# 	description 	= peewee.CharField(db_column='description', null=True)
# 	created			= peewee.DateTimeField(db_column='created', default=sql_date)
# 	updated			= peewee.DateTimeField(db_column='updated', default=sql_date)
# 	status			= peewee.IntegerField(db_column='status')						# статус - новое, завершено,...
# 	priority		= peewee.IntegerField(db_column='priority')						# приоритет - выжно, не очень,...

# 	class Meta:
# 		db_table = 'todos'



if __name__ == "__main__":


	result = Group.select()
	print(result)
	for r in result:
		print(r)