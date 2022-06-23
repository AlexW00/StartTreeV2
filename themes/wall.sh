#! /usr/bin/bash

cp "${HOME}/.cache/wal/colors.css" .
mv colors.css wal.css

git add wal.css
git commit -m "changed wal colors"
git push
