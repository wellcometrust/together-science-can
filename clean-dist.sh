#!/bin/bash

mkdir -p dist
rm -rf dist/*
# symlink to static files
cd dist
ln -s ../static static
cd ..
