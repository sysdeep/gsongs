#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import time
from shutil import make_archive
from zipfile import ZipFile

from vendor import auto
from flask import Flask, render_template, request, redirect, url_for, jsonify, session, send_file

from . import storage, VERSION






def chords_page():
	"""страница для обслуживания базы данных"""
	
	# #--- проверка и создание папки backups
	# if not os.path.exists(storage.DIR_BACKUPS):
	# 	os.mkdir(storage.DIR_BACKUPS)
		
	# #--- список всех файлов в каталоге backups
	# files = os.listdir(storage.DIR_BACKUPS)
	# files.sort()
	
	data = {
		"VERSION" 		: VERSION,
		# "DB_FILE" 		: storage.DB_FILE,
		# "SHARED_FILES"	: files
	}
	# data = {}
	return render_template("service/chords.html", **data)






# def db_backup():
# 	"""создание backup для базы данных"""
	
# 	#--- исходный файл
# 	db_dir = os.path.dirname(storage.DB_FILE)
# 	db_name = os.path.basename(storage.DB_FILE)
	
# 	#--- новый файл
# 	now_time = time.strftime( "%Y.%m.%d-%H.%M.%S" )			# дата
# 	dest_file = os.path.join(storage.DIR_BACKUPS, storage.FILE_NAME + "." + now_time)
	
# 	backup_file_name = storage.FILE_NAME + "qqq." + now_time

# 	cwd = os.getcwd()
	
# 	#--- создание архива
# 	with ZipFile(dest_file + ".zip", "w") as zfile:
# 		#--- перемещаемся в каталог базы данных(штоб путь в архиве был нормальный)
# 		os.chdir(db_dir)
# 		zfile.write(db_name)

# 	os.chdir(cwd)
	
# 	#--- redirect
# 	return redirect("/service/db")
	





# def db_download(file_name):
# 	"""скачивание заданного файла"""
	
# 	#--- полный путь
# 	file_path = os.path.join(storage.DIR_BACKUPS, file_name)
	
# 	if os.path.exists(file_path):
# 		return send_file(file_path)
# 	else:
# 		return redirect("/service/db")




	
# def db_remove(file_name):
# 	"""удаление заданного файла"""
	
# 	#--- полный путь
# 	file_path = os.path.join(storage.DIR_BACKUPS, file_name)
	
# 	if os.path.exists(file_path):
# 		os.remove(file_path)
		
# 	return redirect("/service/db")
		
		
		
	