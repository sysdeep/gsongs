#!/usr/bin/env python
# -*- coding: utf-8 -*-

# from app import app
#
# app.run(debug=True)



from app.main import app

# app = create_app()
app.run(debug=True, host="0.0.0.0", port=5000)
# app.run(debug=False)