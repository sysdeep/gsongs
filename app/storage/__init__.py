from .controller import init_db
from .models import Singer, Song, Todo, Tag, RTagSong, sql_date

__all__ = ['Singer', 'Song', 'Todo', 'Tag', 'RTagSong', 'sql_date']

init_db()
