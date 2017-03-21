#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import time
from shutil import make_archive
from zipfile import ZipFile

from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session, send_file

from . import storage, VERSION






def db_page():
	"""страница для обслуживания базы данных"""
	
	#--- проверка и создание папки backups
	if not os.path.exists(storage.DIR_BACKUPS):
		os.mkdir(storage.DIR_BACKUPS)
		
	#--- список всех файлов в каталоге backups
	files = os.listdir(storage.DIR_BACKUPS)
	files.sort()
	
	data = {
		"VERSION" 		: VERSION,
		"DB_FILE" 		: storage.DB_FILE,
		"SHARED_FILES"	: files
	}
	return render_template("service/db.html", **data)






def db_backup():
	"""создание backup для базы данных"""
	
	#--- исходный файл
	db_dir = os.path.dirname(storage.DB_FILE)
	db_name = os.path.basename(storage.DB_FILE)
	
	#--- новый файл
	now_time = time.strftime( "%Y.%m.%d-%H.%M.%S" )			# дата
	dest_file = os.path.join(storage.DIR_BACKUPS, storage.FILE_NAME + "." + now_time)
	
	backup_file_name = storage.FILE_NAME + "qqq." + now_time

	cwd = os.getcwd()
	
	#--- создание архива
	with ZipFile(dest_file + ".zip", "w") as zfile:
		#--- перемещаемся в каталог базы данных(штоб путь в архиве был нормальный)
		os.chdir(db_dir)
		zfile.write(db_name)

	os.chdir(cwd)
	
	#--- redirect
	return redirect("/service/db")
	





def db_download(file_name):
	"""скачивание заданного файла"""
	
	#--- полный путь
	file_path = os.path.join(storage.DIR_BACKUPS, file_name)
	
	if os.path.exists(file_path):
		return send_file(file_path)
	else:
		return redirect("/service/db")




	
def db_remove(file_name):
	"""удаление заданного файла"""
	
	#--- полный путь
	file_path = os.path.join(storage.DIR_BACKUPS, file_name)
	
	if os.path.exists(file_path):
		os.remove(file_path)
		
	return redirect("/service/db")
		
		
		
		
# def todo_json_get():
# 	items = storage.Todo.select()
	
# 	data = []
# 	for item in items:
# 		row = {
# 			"id"			: item.id,
# 			"title"			: item.title,
# 			"description"	: item.description,
# 			"created"		: str(item.created),
# 			"updated"		: str(item.updated),
# 			"status"		: item.status,
# 			"priority"		: item.priority
# 		}
# 		data.append(row)


# 	return jsonify(items=data)


# def todo_json_add():

# 	in_data = request.get_json()
# 	totdo = storage.Todo.create(
# 		title=in_data["title"],
# 		description=in_data["description"],
# 		status=in_data["status"],
# 		priority=in_data["priority"]
# 	)
# 	last_record = storage.Todo.select().order_by(storage.Todo.id.desc()).get()

# 	in_data["id"] = last_record.id
# 	in_data["created"] = str(last_record.created)
# 	in_data["updated"] = str(last_record.updated)
# 	return jsonify(item=in_data)


# def todo_json_update():

# 	in_data = request.get_json()


# 	item = storage.Todo.get(storage.Todo.id == in_data["id"])
# 	item.title 			= in_data["title"]
# 	item.description 	= in_data["description"]
# 	item.status 		= in_data["status"]
# 	item.priority 		= in_data["priority"]
# 	item.updated 		= storage.sql_date()
# 	item.save()

# 	in_data["updated"] = str(item.updated)

# 	return jsonify(item=in_data)


# def todo_json_remove():

# 	in_data = request.get_json()

# 	item = storage.Todo.get(storage.Todo.id == in_data["id"])
# 	item.delete_instance()

# 	return jsonify(item=in_data)


