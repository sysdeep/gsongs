import peewee

from rc import DB_FILE_PATH

db = peewee.SqliteDatabase(DB_FILE_PATH)
