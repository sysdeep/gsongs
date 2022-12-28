# GSongs

## Repo

- https://github.com/sysdeep/gsongs.git
- git@github.com:sysdeep/gsongs.git

## Dependencies

    pip install flask==1.1.1 -t vendor
    pip install peewee==2.8.0 -t vendor

## Comcon deploy(2016.12.15)

Изменена система перезапуска проекта. Основной сервис стартует от системы, он запускает оболочку слежения gvisor, которая в свою очередь следит за наличием файлов команд в каталоге cdir. При появлении файлов start и stop gvisor запускает процесс или останавливает.

Тем самым нет необходимости перезапускать системный процесс(что требует определённых привелегий)

## Ubuntu upstart

config: /etc/init/nia.conf

    description "NIA Service"
    start on runlevel [2345]
    stop on runlevel [!2345]
    respawn
    respawn limit 10 5
    setuid diver
    setgid diver
    env HOME="/home/diver"
    env USER="diver"
    exec /home/diver/bin/python3 /home/diver/Apps/gsongs/gsongs/gvisor.py

## Запуск - остановка

Для запуска достаточно создать файл start в каталоге cdir, а для остановки - файл stop.

Для удобства - созданы 2 скрипта(необходимо поместить их на уровень выше текущего каталога)

./add/gvisor_files/start.sh

    #!/bin/sh
    touch ./gsongs/cdir/start

./add/gvisor_files/stop.sh

    #!/bin/sh
    touch ./gsongs/cdir/stop

## Sites

- https://amdm.ru
- https://mychords.net
- https://www.5lad.ru
- https://muzachos.com
