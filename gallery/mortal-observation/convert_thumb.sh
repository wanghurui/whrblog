#!/bin/bash
for i in *.jpg
do
    echo "生成缩略图 $i ..."
    convert -thumbnail 480 $i ./thumbnails/thumb_$i
done
