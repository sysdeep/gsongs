from flask import render_template

from rc import VERSION


def service_page():
    data = {"VERSION": VERSION}
    return render_template("service/main.html", **data)
