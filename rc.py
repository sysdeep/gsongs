import os.path

VERSION = '1.0.0'

SELF_DIR = os.path.dirname(os.path.abspath(__file__))
VAR_DIR = os.path.join(os.path.dirname(SELF_DIR), 'var')

# db file
DB_FILE_NAME = "storage.db"
DB_FILE_PATH = os.path.join(VAR_DIR, DB_FILE_NAME)

# db files backups
BACKUPS_DIR = os.path.join(VAR_DIR, "backups")
