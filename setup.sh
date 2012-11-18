#!/bin/sh
npm install
createdb $USER-secretarius
psql $USER-secretarius -f model.sql
