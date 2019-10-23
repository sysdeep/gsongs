#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# from app import app
#
# app.run(debug=True)

import sys
import os.path

#--- prepare env
DIR_SELF = os.path.dirname(os.path.abspath(__file__))
DIR_VENDOR = os.path.join(DIR_SELF, "vendor")
if not DIR_VENDOR in sys.path:
	sys.path.insert( 0, DIR_VENDOR )


from app.main import app

# app = create_app()
app.run(debug=True, host="127.0.0.1", port=5000)
# app.run(debug=False)