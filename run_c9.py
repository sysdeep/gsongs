#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    run_c9.py - запуск проекта в среде c9io
    ситемные переменные:
        IP      - ip("0.0.0.0")
        PORT    - port("8080")
        
    при запуске реальный хост - http://python-apps-diver.c9users.io/ или http://python-apps-diver.c9users.io:8080
"""
import os
from app.main import app



# use os.getenv(PORT, 8080) as the port and os.getenv(IP, 0.0.0.0) as the host in your scripts!

host = os.getenv("IP", "0.0.0.0")
port = int(os.getenv("PORT", 8080))


# app = create_app()
help_host_text = "http://python-apps-diver.c9users.io/"
print("starting app on: {}:{}".format(host, port))
print("starting app on: {}".format(help_host_text))
app.run(debug=True, host=host, port=port)

# app.run(debug=False)