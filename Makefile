# Makefile

CHDB="../chdb.db"



push: 
	git push git@github.com:sysdeep/gsongs.git master

pull:
	git pull git@github.com:sysdeep/gsongs.git master




drop_chdb:
	rm $(CHDB)

init_chdb:
	cat ./add/chdb/init.sql | sqlite3 $(CHDB)