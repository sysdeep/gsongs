from .controller import init_db
#from .loader import DB_FILE, DB_DIR, FILE_NAME, DIR_BACKUPS
from .models import Singer, Song, Todo, Tag, RTagSong, sql_date

#VERSION = "1.0.0"

init_db()
