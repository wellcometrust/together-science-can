#!/bin/bash
set -o errexit

mkdir -p dist
rm -rf dist/*
# symlink to static files and other stuff
cd dist
ln -s ../static static
ln -s ../robots.txt robots.txt
ln -s ../components/thank-you-nojs thank-you
cd ..
