import os.path
import time

import peewee

from rc import DB_FILE_PATH
from .loader import db
from .models import *


def init_db():
    if not os.path.exists(DB_FILE_PATH):
        print("файл базы данных не найден - создаём: {}".format(DB_FILE_PATH))
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
