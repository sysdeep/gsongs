# Makefile

CHDB="../chdb.db"



#--- frontend -----------------------------------------------------------------
gsongs_dev:
	npm run gsongs

gsongs_production:
	PRODUCTION=1 npm run gsongs


todo_dev:
	npm run todo

todo_production:
	PRODUCTION=1 npm run todo


chords_edit_dev:
	npm run chords_edit

chords_edit_production:
	PRODUCTION=1 npm run chords_edit


chords_view_dev:
	npm run chords_view

chords_view_production:
	PRODUCTION=1 npm run chords_view
#--- frontend -----------------------------------------------------------------


push: 
	git push git@github.com:sysdeep/gsongs.git master

pull:
	git pull git@github.com:sysdeep/gsongs.git master




drop_chdb:
	rm $(CHDB)

init_chdb:
	cat ./add/chdb/init.sql | sqlite3 $(CHDB)