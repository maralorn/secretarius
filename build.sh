#!/bin/sh

rm -r lib
cp -r src lib
node_modules/.bin/_coffee -c lib
find lib -name "*._coffee" -exec rm {} \;
