#!/bin/sh




DIR_BUILD="build"
DIR_SRC="gsongs"
CWD=`pwd`




cd ..

if [ -e ${DIR_BUILD} ]
then
    echo "clear build dir"
    rm -rdf ${DIR_BUILD}  
fi


echo "cloning"
git clone ${DIR_SRC} ${DIR_BUILD}

echo "remove git folder"
rm -drf ${DIR_BUILD}/.git
rm -drf ${DIR_BUILD}/.vscode


echo "copy js"
cp -dr ${DIR_SRC}/app/static/build ${DIR_BUILD}/app/static/build 


cd ${CWD}

echo "Done"
