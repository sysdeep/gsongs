#!/usr/bin/env python
# -*- coding: utf-8 -*-

# from app import app
#
# app.run(debug=True)



from app.main import app

# app = create_app()
app.run(debug=False, host="127.0.0.1", port=5000)
# app.run(debug=False)