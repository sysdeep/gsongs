# Makefile

CHDB="../chdb.db"





drop_chdb:
	rm $(CHDB)

init_chdb:
	cat ./add/chdb/init.sql | sqlite3 $(CHDB)