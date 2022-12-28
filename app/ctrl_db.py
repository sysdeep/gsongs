import os
import time
from zipfile import ZipFile

from flask import Flask, render_template, redirect, send_file

from rc import DB_FILE_NAME, BACKUPS_DIR, VERSION


def db_page():
    """страница для обслуживания базы данных"""

    if not os.path.exists(BACKUPS_DIR):
        os.mkdir(BACKUPS_DIR)

    # список всех файлов в каталоге backups
    files = os.listdir(BACKUPS_DIR)
    files.sort()

    data = {"VERSION": VERSION, "DB_FILE": DB_FILE_NAME, "SHARED_FILES": files}
    return render_template("service/db.html", **data)


def db_backup():
    """создание backup для базы данных"""

    # исходный файл
    db_dir = os.path.dirname(DB_FILE_NAME)
    db_name = os.path.basename(DB_FILE_NAME)

    # новый файл
    now_time = time.strftime("%Y.%m.%d-%H.%M.%S")  # дата
    dest_file = os.path.join(BACKUPS_DIR, DB_FILE_NAME + "." + now_time)

    cwd = os.getcwd()

    # создание архива
    with ZipFile(dest_file + ".zip", "w") as zfile:
        # перемещаемся в каталог базы данных(штоб путь в архиве был нормальный)
        os.chdir(db_dir)
        zfile.write(db_name)

    os.chdir(cwd)

    # redirect
    return redirect("/service/db")


def db_download(file_name):
    """скачивание заданного файла"""

    # полный путь
    file_path = os.path.join(BACKUPS_DIR, file_name)

    if os.path.exists(file_path):
        return send_file(file_path)
    else:
        return redirect("/service/db")


def db_remove(file_name):
    """удаление заданного файла"""

    # полный путь
    file_path = os.path.join(BACKUPS_DIR, file_name)

    if os.path.exists(file_path):
        os.remove(file_path)

    return redirect("/service/db")
