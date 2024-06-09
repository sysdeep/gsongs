#!/usr/bin/env python
# -*- coding: utf-8 -*-
import logging
import logging.handlers
import os
import signal
import subprocess
import sys
import time

DIR_SELF = os.path.dirname(os.path.abspath(__file__))
DIR_CHECK = os.path.join(DIR_SELF, "cdir")
DIR_APP = DIR_SELF

# PY = "/usr/bin/python3"
PY = "/home/diver/bin/python3"
APP = os.path.join(DIR_APP, "comcon.py")

DATA = {"terminated": False, "proc": None}

#--- logging ------------------------------------------------------------------
log = logging.getLogger("app")
format_file = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
# log.setLevel(logging.DEBUG)
log.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stderr)
handler.setFormatter(format_file)
log.addHandler(handler)
#--- logging ------------------------------------------------------------------


def __remove_file(file_name):
    """удаление текущих рабочих файлов"""
    log.debug("удаление файла: " + file_name)
    os.remove(os.path.join(DIR_CHECK, file_name))


def __start_proc():
    """запуск программы"""
    log.debug("запуск процесса")
    # proc = subprocess.Popen(cmd, shell=True)
    proc = subprocess.Popen([PY, APP], shell=False, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, cwd=DIR_APP)
    DATA["proc"] = proc


def __stop_proc():
    """остановка процесса"""
    log.debug("stop proc")
    proc = DATA["proc"]
    if proc is None:
        return

    proc.kill()
    # proc.terminate()
    # proc.send_signal(2)
    DATA["proc"] = None
    time.sleep(2)


def check_files():
    log.debug("проверка файлов")
    files = os.listdir(DIR_CHECK)
    if not files:
        return

    for f in files:
        if f == "start":
            __start_proc()
        elif f == "stop":
            __stop_proc()
        elif f == "restart":
            __stop_proc()
            __start_proc()

        __remove_file(f)


def run():
    """основной запуск"""
    log.debug("=" * 20)
    log.debug("запуск")
    log.debug("=" * 20)

    #--- change working dir
    os.chdir(DIR_APP)
    log.debug("рабочий каталог: {}".format(DIR_APP))

    #--- run programm
    __start_proc()

    log.debug("начало цикла слежения")
    while not DATA["terminated"]:

        #--- проверка
        check_files()
        time.sleep(3)


def __signal_handler(signum, frame):
    """обработчик сигнала завершения от системы"""
    log.debug("перехвачен сигнал SIGINT(Ctrl+C) or SIGTERM")
    log.debug("запрос на выход из cmd")

    __stop_proc()

    sys.exit(0)


if __name__ == "__main__":

    signal.signal(signal.SIGINT, __signal_handler)  # обработка Ctrl+C
    signal.signal(signal.SIGTERM, __signal_handler)  # обработка Ctrl+C

    run()
