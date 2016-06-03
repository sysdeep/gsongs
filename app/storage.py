#!/usr/bin/env python
# -*- coding: utf-8 -*-

from vendor import auto
import peewee
import os.path
import datetime




SELF_DIR 	= os.path.dirname(os.path.abspath(__file__))
DIR_UP1 	= os.path.dirname(SELF_DIR)
DIR_UP2 	= os.path.dirname(DIR_UP1)

DB_FILE 		= os.path.join(DIR_UP2, "storage.db")

print("используемый файл базы данных: {}".format(DB_FILE))

db = peewee.SqliteDatabase(DB_FILE)


def sql_date():
		return datetime.datetime.strftime( datetime.datetime.now(), "%Y-%m-%d %H:%M:%S" )


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




# class Tag(Base):
# 	id 		= peewee.IntegerField(db_column='id', primary_key=True)
# 	name 	= peewee.CharField(db_column='name')
# 	created	= peewee.DateTimeField(db_column='created', default=sql_date)
# 	updated	= peewee.DateTimeField(db_column='updated', default=sql_date)

# 	class Meta:
# 		db_table = 'tags'



# class UsersLog(Base):
# 	id 		= peewee.IntegerField(db_column='id', primary_key=True)
# 	name 	= peewee.CharField(db_column='name')
# 	sname 	= peewee.CharField(db_column='sname')
# 	passwd 	= peewee.CharField(db_column='passwd')
# 	level 	= peewee.IntegerField(db_column='level')
# 	updated	= peewee.DateTimeField(db_column='updated', default=sql_date)
# 	action 	= peewee.CharField(db_column='action')

# 	class Meta:
# 		db_table = 'users_log'


# class GuiAttrs(Base):
# 	id 		= peewee.IntegerField(db_column='id', primary_key=True)
# 	sys_id 	= peewee.CharField(db_column='sys_id')
# 	attr_id = peewee.CharField(db_column='attr_id')
# 	value 	= peewee.CharField(db_column='value')
# 	updated	= peewee.DateTimeField(db_column='updated', default=sql_date)

# 	class Meta:
# 		db_table = 'gui_attrs'




# class Units(Base):
# 	id 		= peewee.IntegerField(db_column='id', primary_key=True)
# 	sys_id 	= peewee.CharField(db_column='sys_id')
# 	attr_id = peewee.IntegerField(db_column='attr_id')
# 	value 	= peewee.CharField(db_column='value')
# 	updated	= peewee.DateTimeField(db_column='updated', default=sql_date)

# 	class Meta:
# 		db_table = 'units'


# class UnitsLog(Base):
# 	id 		= peewee.IntegerField(db_column='id', primary_key=True)
# 	sys_id 	= peewee.CharField(db_column='sys_id')
# 	attr_id = peewee.IntegerField(db_column='attr_id')
# 	value 	= peewee.CharField(db_column='value')
# 	updated	= peewee.DateTimeField(db_column='updated', default=sql_date)
# 	action 	= peewee.CharField(db_column='action')

# 	class Meta:
# 		db_table = 'units_log'


# class PlcErr(Base):
# 	id 		= peewee.IntegerField(db_column='id', primary_key=True)
# 	sys_id 	= peewee.CharField(db_column='sys_id')
# 	plc_id 	= peewee.CharField(db_column='plc_id')
# 	obj_id 	= peewee.CharField(db_column='obj_id')
# 	attr_id = peewee.IntegerField(db_column='attr_id')
# 	value 	= peewee.CharField(db_column='value')
# 	updated	= peewee.DateTimeField(db_column='updated', default=sql_date)

# 	class Meta:
# 		db_table = 'plc_err'





# def singer_create(name):
# 	Singer.create(name=name, updated=sql_date())




# def user_create(name, passwd, level=1, sname=""):
# 	log.debug("user_create - name: {}, pass: {}, level: {}, sname: {}".format(name, passwd, level, sname))
# 	Users.create(name=name, passwd=passwd, level=level, sname=sname, created=sql_date(), updated=sql_date())
# 	UsersLog.create(name=name, passwd=passwd, level=level, sname=sname, created=sql_date(), updated=sql_date(), action="i")

# def user_get(name):
# 	try:
# 		row = Users.get(Users.name==name)
# 		row = {
# 			"name": row.name,
# 			"pass": row.passwd,
# 			"level": row.level,
# 			"sname": row.sname
# 		}
# 	except:
# 		row = None
# 	return row




# def gui_attr_create(sys_id, attr_id, value):
# 	log.debug("gui_attr_create - sys_id: {}, attr_id: {}, value: {}".format(sys_id, attr_id, value))
# 	GuiAttrs.create(sys_id=sys_id, attr_id=attr_id, value=value, updated=sql_date())



# def unit_set(sys_id, attr_id, value):
# 	log.debug("set attr - sys_id: {}, attr_id: {}, value: {}".format(sys_id, attr_id, value))
# 	try:
# 		unit = Units.get(Units.sys_id==sys_id, Units.attr_id==attr_id)
# 		action = "u"
# 		log.debug("set: attr found - update")
# 	except:
# 		unit = Units()
# 		action = "i"
# 		log.debug("set: attr not found - create")

# 	unit.sys_id = sys_id
# 	unit.attr_id = attr_id
# 	unit.value = str(value)
# 	unit.updated = sql_date()

# 	unit.save()

# 	UnitsLog.create(sys_id=sys_id, attr_id=attr_id, value=value, updated=sql_date(), action=action)





# def unit_all():
# 	log.debug("unit_all")
# 	try:
# 		prows = Units.select()
# 	except:
# 		rows = []
# 		return rows

# 	rows = []
# 	for row in prows:
# 		rowq = {
# 			"sys_id": row.sys_id,
# 			"attr_id": row.attr_id,
# 			"value": row.value
# 		}
# 		rows.append(rowq) 

# 	return rows









# def plcerr_set(sys_id, plc_id, obj_id, attr_id, value):
# 	PlcErr.create(sys_id=sys_id, attr_id=attr_id, value=value, updated=sql_date(), plc_id=plc_id, obj_id=obj_id)











if not os.path.exists(DB_FILE):
	print("файл базы данных не найден - создаём: {}".format(DB_FILE))
	db.create_tables([Singer, Song])





# if not PlcErr.table_exists():
# 	PlcErr.create_table()



def close():
	db.close()


def open():
	db.connect()


if __name__ == "__main__":
	
	print("main")



	# PlcErr.create_table()