#!/bin/bash

mkdir -p dist
rm -rf dist/*
# symlink to static files
pushd dist
ln -s ../static static
popd
