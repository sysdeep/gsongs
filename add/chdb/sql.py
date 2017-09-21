#!/usr/bin/env python
# -*- coding: utf-8 -*-




CREATE_TABLE_FILES = """
    CREATE TABLE "files" (
        "id"            INTEGER PRIMARY KEY AUTOINCREMENT,
        "volume_id"     INTEGER NOT NULL,
        "uuid"          VARCHAR(64),
        "parent_id"     VARCHAR(64),
        "name"          VARCHAR(64) NOT NULL,
        "type"          INTEGER NOT NULL,
        "rights"        INTEGER,
        "sowner"        VARCHAR(64),
        "sgroup"        VARCHAR(64),
        "ctime"         INTEGER,
        "atime"         INTEGER,
        "mtime"         INTEGER,
        "category"      INTEGER,
        "description"   TEXT,
        "size"          INTEGER

    );
"""