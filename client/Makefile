# Makefile



#--- frontend -----------------------------------------------------------------
gsongs_dev:
	npm run gsongs

gsongs_production:
	PRODUCTION=1 npm run gsongs


spa_dev:
	npm run spa

spa_production:
	PRODUCTION=1 npm run spa


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


remake_all:
	PRODUCTION=1 npm run gsongs
	PRODUCTION=1 npm run todo
	PRODUCTION=1 npm run chords_view
	PRODUCTION=1 npm run chords_edit